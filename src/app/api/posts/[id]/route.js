import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { deleteFromCloudinary } from "@/lib/cloudinary";

/**
 * Not detayını getirir
 * @param {Request} request İstek
 * @param {Object} params Parametreler
 * @returns {Promise<NextResponse>} Not detayı
 */
export async function GET(request, { params }) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const post = await prisma.post.findUnique({
      where: {
        id: resolvedParams.id,
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
        files: true,
      },
    });

    if (!post) {
      return NextResponse.json(
        { error: "Not bulunamadı" },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Post fetch error:", error);
    return NextResponse.json(
      { error: "Not yüklenirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

/**
 * Not paylaşımını siler
 * @param {Request} request İstek
 * @param {Object} params Parametreler
 * @returns {Promise<NextResponse>} Silme işlemi sonucu
 */
export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    const resolvedParams = await Promise.resolve(params);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Bu işlem için giriş yapmanız gerekiyor" },
        { status: 401 }
      );
    }

    // Postu bul
    const post = await prisma.post.findUnique({
      where: { id: resolvedParams.id },
      include: { 
        author: true,
        files: true 
      }
    });

    if (!post) {
      return NextResponse.json(
        { error: "Not bulunamadı" },
        { status: 404 }
      );
    }

    // Yalnızca post sahibi silebilir
    if (post.author.email !== session.user.email) {
      return NextResponse.json(
        { error: "Bu notu silme yetkiniz yok" },
        { status: 403 }
      );
    }

    try {
      // Cloudinary'den dosyaları sil
      for (const file of post.files) {
        try {
          // URL'den public_id çıkar
          const publicId = file.url.split('/').slice(-1)[0].split('.')[0];
          await deleteFromCloudinary(publicId);
        } catch (error) {
          console.error("Cloudinary delete error:", error);
        }
      }

      // Veritabanından sil
      await prisma.$transaction([
        // Önce bookmarkları sil
        prisma.bookmark.deleteMany({
          where: { postId: resolvedParams.id }
        }),
        // Sonra postu sil (cascade ile dosya ve yorumlar da silinecek)
        prisma.post.delete({
          where: { id: resolvedParams.id }
        })
      ]);

      return NextResponse.json({ message: "Not başarıyla silindi" });
    } catch (error) {
      console.error("Transaction error:", error);
      return NextResponse.json(
        { error: "Not silinirken bir hata oluştu" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Post delete error:", error);
    return NextResponse.json(
      { error: "Not silinirken bir hata oluştu" },
      { status: 500 }
    );
  }
} 