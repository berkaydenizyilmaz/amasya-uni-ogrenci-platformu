import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Zod schema'yı route handler dışına taşıyoruz
const validateComment = (data) => {
  const schema = z.object({
    content: z.string().min(1),
  });
  return schema.parse(data);
};

/**
 * Not yorumlarını listeler
 * @param {Request} request İstek
 * @param {Object} params Parametreler
 * @returns {Promise<NextResponse>} Not yorumları
 */
export async function GET(request, { params }) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const comments = await prisma.comment.findMany({
      where: {
        postId: resolvedParams.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(comments);
  } catch (error) {
    console.error("Comments fetch error:", error);
    return NextResponse.json(
      { error: "Yorumlar yüklenirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

/**
 * Yeni yorum oluşturur
 * @param {Request} request İstek
 * @param {Object} params Parametreler
 * @returns {Promise<NextResponse>} Oluşturulan yorum
 */
export async function POST(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    const resolvedParams = await Promise.resolve(params);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Bu işlem için giriş yapmanız gerekiyor" },
        { status: 401 }
      );
    }

    // Kullanıcıyı email ile bul
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true }
    });

    if (!user) {
      return NextResponse.json(
        { error: "Kullanıcı bulunamadı" },
        { status: 404 }
      );
    }

    const json = await request.json();
    
    try {
      const validatedData = validateComment(json);
      
      const comment = await prisma.comment.create({
        data: {
          content: validatedData.content,
          authorId: user.id,
          postId: resolvedParams.id,
        },
        include: {
          author: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      });

      return NextResponse.json(comment);
    } catch (validationError) {
      return NextResponse.json(
        { error: "Geçersiz yorum içeriği" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Comment create error:", error);
    return NextResponse.json(
      { error: "Yorum paylaşılırken bir hata oluştu" },
      { status: 500 }
    );
  }
} 