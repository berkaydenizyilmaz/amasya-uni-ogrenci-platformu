import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const commentSchema = z.object({
  content: z.string().min(1),
});

/**
 * Not yorumlarını listeler
 * @param {Request} request İstek
 * @param {Object} params Parametreler
 * @returns {Promise<NextResponse>} Not yorumları
 */
export async function GET(request, { params }) {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId: params.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            name: true,
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

    if (!session) {
      return NextResponse.json(
        { error: "Bu işlem için giriş yapmanız gerekiyor" },
        { status: 401 }
      );
    }

    const json = await request.json();
    const body = commentSchema.parse(json);

    const comment = await prisma.comment.create({
      data: {
        content: body.content,
        authorId: session.user.id,
        postId: params.id,
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json(comment);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Geçersiz veri" },
        { status: 400 }
      );
    }

    console.error("Comment create error:", error);
    return NextResponse.json(
      { error: "Yorum paylaşılırken bir hata oluştu" },
      { status: 500 }
    );
  }
} 