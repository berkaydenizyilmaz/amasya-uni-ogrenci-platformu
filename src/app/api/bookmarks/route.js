import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/**
 * Kullanıcının kaydettiği notları getirir
 * @returns {Promise<NextResponse>} Kaydedilen notların listesi
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Oturum açmanız gerekiyor" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "Kullanıcı bulunamadı" }, { status: 404 });
    }

    const bookmarks = await prisma.bookmark.findMany({
      where: { userId: user.id },
      include: { post: true },
    });

    return NextResponse.json(bookmarks);
  } catch (error) {
    console.error("Bookmarks fetch error:", error);
    return NextResponse.json(
      { error: "Kaydedilen notlar getirilirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

/**
 * Not kaydetme/kayıt kaldırma işlemini gerçekleştirir
 * @param {Request} request HTTP isteği
 * @returns {Promise<NextResponse>} İşlem sonucu
 */
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Oturum açmanız gerekiyor" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "Kullanıcı bulunamadı" }, { status: 404 });
    }

    const { postId } = await request.json();

    if (!postId) {
      return NextResponse.json({ error: "Post ID gerekli" }, { status: 400 });
    }

    // Not var mı kontrol et
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json({ error: "Not bulunamadı" }, { status: 404 });
    }

    // Kayıt var mı kontrol et
    const existingBookmark = await prisma.bookmark.findFirst({
      where: {
        userId: user.id,
        postId: postId,
      },
    });

    if (existingBookmark) {
      // Kayıt varsa kaldır
      await prisma.bookmark.delete({
        where: { id: existingBookmark.id },
      });
      return NextResponse.json({ message: "Not kaydı kaldırıldı" });
    } else {
      // Kayıt yoksa ekle
      const bookmark = await prisma.bookmark.create({
        data: {
          userId: user.id,
          postId: postId,
        },
      });
      return NextResponse.json(bookmark);
    }
  } catch (error) {
    console.error("Bookmark error:", error);
    return NextResponse.json(
      { error: "Not kaydedilirken bir hata oluştu" },
      { status: 500 }
    );
  }
} 