'use client';

import { useEffect, useState, use } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { FileText, MessageCircle, Trash2, Download } from "lucide-react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function PostDetailPage({ params }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const resolvedParams = use(params);

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/posts/${resolvedParams.id}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Not yüklenirken bir hata oluştu");
      }

      setPost(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/posts/${resolvedParams.id}/comments`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Yorumlar yüklenirken bir hata oluştu");
      }

      setComments(data);
    } catch (error) {
      console.error("Comments fetch error:", error);
    }
  };

  const handleDelete = async () => {
    if (!session || session.user.email !== post.author.email) {
      setError("Bu notu silme yetkiniz yok");
      return;
    }

    try {
      const response = await fetch(`/api/posts/${resolvedParams.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Not silinirken bir hata oluştu");
      }

      router.push("/not-paylasimi");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!session) {
      setError("Yorum yapmak için giriş yapmalısınız");
      return;
    }

    if (!commentContent.trim()) {
      setError("Yorum boş olamaz");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch(`/api/posts/${resolvedParams.id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: commentContent }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Yorum gönderilirken bir hata oluştu");
      }

      setCommentContent("");
      fetchComments();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-theme-bg">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Yükleniyor...</div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-theme-bg">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-50 text-red-500 p-3 rounded-lg">{error}</div>
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="min-h-screen bg-theme-bg">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Not bulunamadı</div>
        </div>
      </main>
    );
  }

  const getCategoryLabel = (category) => {
    const categories = {
      DERS_NOTU: "Ders Notu",
      SINAV_NOTU: "Sınav Notu",
      OZET: "Özet",
      KAYNAK: "Kaynak"
    };
    return categories[category] || category;
  };

  return (
    <main className="min-h-screen bg-theme-bg">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{post.author.name}</div>
                  <div className="text-sm text-theme-text-muted">
                    {new Date(post.createdAt).toLocaleDateString('tr-TR')}
                  </div>
                </div>
              </div>
              {session?.user?.email === post.author.email && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="hover:bg-red-600"
                      title="Notu Sil"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Notu Silmek İstediğinize Emin Misiniz?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Bu işlem geri alınamaz. Not ve ilgili tüm yorumlar kalıcı olarak silinecektir.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Vazgeç</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDelete}
                        className="bg-red-500 hover:bg-red-600"
                      >
                        Sil
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>

            <h1 className="text-2xl font-bold mb-4">{post.title}</h1>

            <div className="flex flex-wrap items-center gap-2 mb-4">
              {post.faculty && (
                <span className="text-sm px-2 py-1 bg-blue-50 text-blue-600 rounded">
                  {post.faculty}
                </span>
              )}
              {post.department && (
                <span className="text-sm px-2 py-1 bg-green-50 text-green-600 rounded">
                  {post.department}
                </span>
              )}
              <span className="text-sm px-2 py-1 bg-theme-primary/10 text-theme-primary rounded">
                {getCategoryLabel(post.category)}
              </span>
            </div>

            <div className="prose prose-theme max-w-none mb-6">
              {post.content}
            </div>

            {post.files && post.files.length > 0 && (
              <div className="border rounded-lg p-4 mb-6">
                <h3 className="font-medium mb-3">Dosyalar</h3>
                <div className="grid gap-2">
                  {post.files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-theme-primary/5 rounded p-2">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        <span className="text-sm">{file.name}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-theme-primary hover:text-theme-primary-hover"
                        asChild
                      >
                        <Link href={file.url} target="_blank" download>
                          <Download className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Yorumlar ({comments.length})
          </h2>

          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleCommentSubmit} className="space-y-4">
            <Textarea
              placeholder="Yorumunuzu yazın..."
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              disabled={!session || isSubmitting}
            />
            <Button
              type="submit"
              disabled={!session || isSubmitting}
              className="w-full"
            >
              {isSubmitting ? "Gönderiliyor..." : "Yorum Yap"}
            </Button>
          </form>

          <div className="space-y-4">
            {comments.map((comment) => (
              <Card key={comment.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>
                        {comment.author.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">
                          {comment.author.name}
                        </span>
                        <span className="text-sm text-theme-text-muted">
                          {new Date(comment.createdAt).toLocaleDateString('tr-TR')}
                        </span>
                      </div>
                      <p className="text-theme-text">{comment.content}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {comments.length === 0 && (
              <div className="text-center text-theme-text-muted py-4">
                Henüz yorum yapılmamış
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
} 