import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const eventSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  location: z.string().min(1),
  category: z.enum(["AKADEMIK", "KULTUR", "SPOR", "SOSYAL", "DIGER"]),
});

/**
 * Etkinlikleri listeler
 * @returns {Promise<NextResponse>} Etkinlik listesi
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const isAdmin = session?.user?.role === "ADMIN";

    // Admin tüm etkinlikleri görebilir
    // Normal kullanıcılar sadece onaylanmış etkinlikleri görebilir
    const events = await prisma.event.findMany({
      where: {
        status: isAdmin ? undefined : "APPROVED" // Admin değilse sadece onaylıları getir
      },
      orderBy: {
        startDate: "asc",
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
    console.error("Events fetch error:", error);
    return NextResponse.json(
      { error: "Etkinlikler yüklenirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

/**
 * Yeni etkinlik oluşturur
 * @param {Request} request İstek
 * @returns {Promise<NextResponse>} Oluşturulan etkinlik
 */
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Bu işlem için giriş yapmanız gerekiyor" },
        { status: 401 }
      );
    }

    const json = await request.json();
    const validatedData = eventSchema.parse(json);

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Kullanıcı bulunamadı" },
        { status: 404 }
      );
    }

    const event = await prisma.event.create({
      data: {
        ...validatedData,
        status: "PENDING",
        author: {
          connect: {
            id: user.id,
          },
        },
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
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join(', ');
      return NextResponse.json(
        { error: `Geçersiz veri: ${errorMessages}` },
        { status: 400 }
      );
    }

    console.error("Event create error:", error);
    return NextResponse.json(
      { error: "Etkinlik oluşturulurken bir hata oluştu" },
      { status: 500 }
    );
  }
} 