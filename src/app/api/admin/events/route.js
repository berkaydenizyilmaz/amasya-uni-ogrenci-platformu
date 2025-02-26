import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/**
 * Admin için etkinlikleri listeler
 * @returns {Promise<NextResponse>} Etkinlik listesi
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.role === "ADMIN") {
      return NextResponse.json(
        { error: "Bu işlem için admin yetkisi gerekiyor" },
        { status: 403 }
      );
    }

    const events = await prisma.event.findMany({
      where: {
        status: "PENDING",
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

    return NextResponse.json(events);
  } catch (error) {
    console.error("Admin events fetch error:", error);
    return NextResponse.json(
      { error: "Etkinlikler yüklenirken bir hata oluştu" },
      { status: 500 }
    );
  }
} 