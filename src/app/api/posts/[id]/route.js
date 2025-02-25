import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * Not detayını getirir
 * @param {Request} request İstek
 * @param {Object} params Parametreler
 * @returns {Promise<NextResponse>} Not detayı
 */
export async function GET(request, { params }) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: params.id,
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