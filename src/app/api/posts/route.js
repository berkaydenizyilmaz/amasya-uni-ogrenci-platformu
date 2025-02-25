import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { z } from "zod";

const postSchema = z.object({
  title: z.string().min(1).max(255),
  content: z.string().min(1),
  category: z.enum(["DERS_NOTU", "SINAV_NOTU", "OZET", "KAYNAK"]),
});

/**
 * Not paylaşımlarını listeler
 * @returns {Promise<NextResponse>} Not paylaşımları
 */
export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
        files: {
          select: {
            id: true,
            name: true,
            url: true,
            type: true,
            size: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });

    if (!posts || !Array.isArray(posts)) {
      console.error("Invalid database response:", posts);
      throw new Error("Veritabanından geçersiz yanıt alındı");
    }

    // Tarihleri ISO string formatına dönüştür
    const formattedPosts = posts.map(post => ({
      ...post,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    }));

    return NextResponse.json(formattedPosts);
  } catch (error) {
    console.error("Posts fetch error:", error);
    return NextResponse.json(
      { error: "Notlar yüklenirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

/**
 * Yeni not paylaşımı oluşturur
 * @param {Request} request İstek
 * @returns {Promise<NextResponse>} Oluşturulan not paylaşımı
 */
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Bu işlem için giriş yapmanız gerekiyor" },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const title = formData.get("title");
    const content = formData.get("content");
    const category = formData.get("category");
    const files = formData.getAll("files");

    // Verileri doğrula
    const validatedData = postSchema.parse({
      title,
      content,
      category,
    });

    // Dosyaları yükle ve veritabanına kaydet
    const filePromises = files.map(async (file) => {
      // Dosya tipini belirle
      const fileType = getFileType(file.type);
      
      // Dosyayı buffer'a dönüştür
      const buffer = Buffer.from(await file.arrayBuffer());
      
      // Dosyayı Cloudinary'ye yükle
      const uploadedFile = await uploadToCloudinary(buffer);

      // Dosya bilgilerini veritabanına kaydet
      return {
        name: file.name,
        url: uploadedFile.secure_url,
        type: fileType,
        size: file.size,
      };
    });

    const uploadedFiles = await Promise.all(filePromises);

    // Postu oluştur
    const post = await prisma.post.create({
      data: {
        title: validatedData.title,
        content: validatedData.content,
        category: validatedData.category,
        authorId: session.user.id,
        files: {
          create: uploadedFiles,
        },
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
        files: true,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Geçersiz veri" },
        { status: 400 }
      );
    }

    console.error("Post create error:", error);
    return NextResponse.json(
      { error: "Not paylaşılırken bir hata oluştu" },
      { status: 500 }
    );
  }
}

/**
 * Dosya tipini belirler
 * @param {string} mimeType MIME tipi
 * @returns {string} Dosya tipi
 */
function getFileType(mimeType) {
  if (mimeType.startsWith('image/')) {
    return 'IMAGE';
  }
  if (mimeType === 'application/pdf') {
    return 'PDF';
  }
  if (mimeType === 'application/msword' || mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    return 'WORD';
  }
  if (mimeType === 'application/vnd.ms-excel' || mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
    return 'EXCEL';
  }
  if (mimeType === 'application/vnd.ms-powerpoint' || mimeType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
    return 'POWERPOINT';
  }
  return 'OTHER';
} 