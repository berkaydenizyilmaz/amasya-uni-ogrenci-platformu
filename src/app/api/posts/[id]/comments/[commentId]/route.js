import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/**
 * Yorumu siler
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

    // Yorumu bul
    const comment = await prisma.comment.findUnique({
      where: { id: resolvedParams.commentId },
      include: { author: true }
    });

    if (!comment) {
      return NextResponse.json(
        { error: "Yorum bulunamadı" },
        { status: 404 }
      );
    }

    // Yalnızca yorum sahibi silebilir
    if (comment.author.email !== session.user.email) {
      return NextResponse.json(
        { error: "Bu yorumu silme yetkiniz yok" },
        { status: 403 }
      );
    }

    // Yorumu sil
    await prisma.comment.delete({
      where: { id: resolvedParams.commentId }
    });

    return NextResponse.json({ message: "Yorum başarıyla silindi" });
  } catch (error) {
    console.error("Comment delete error:", error);
    return NextResponse.json(
      { error: "Yorum silinirken bir hata oluştu" },
      { status: 500 }
    );
  }
} 