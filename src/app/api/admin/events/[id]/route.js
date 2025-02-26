import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/**
 * Etkinlik durumunu günceller
 * @param {Request} request İstek
 * @param {Object} params Parametreler
 * @returns {Promise<NextResponse>} Güncellenen etkinlik
 */
export async function PATCH(request, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.role === "ADMIN") {
      return NextResponse.json(
        { error: "Bu işlem için admin yetkisi gerekiyor" },
        { status: 403 }
      );
    }

    const { status } = await request.json();

    if (!["APPROVED", "REJECTED"].includes(status)) {
      return NextResponse.json(
        { error: "Geçersiz durum değeri" },
        { status: 400 }
      );
    }

    const event = await prisma.event.update({
      where: {
        id: params.id,
      },
      data: {
        status,
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

    return NextResponse.json(event);
  } catch (error) {
    console.error("Event update error:", error);
    return NextResponse.json(
      { error: "Etkinlik güncellenirken bir hata oluştu" },
      { status: 500 }
    );
  }
} 