'use client';

import { useEffect, useState, use, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText, MessageCircle, Trash2, Download, Loader2, MessageSquare } from "lucide-react";
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
  const [commentsLoading, setCommentsLoading] = useState(true);
  const resolvedParams = use(params);

  const fetchPost = useCallback(async () => {
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
  }, [resolvedParams.id]);

  const fetchComments = useCallback(async () => {
    try {
      const response = await fetch(`/api/posts/${resolvedParams.id}/comments`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Yorumlar yüklenirken bir hata oluştu");
      }

      setComments(data);
    } catch (error) {
      console.error("Comments fetch error:", error);
    } finally {
      setCommentsLoading(false);
    }
  }, [resolvedParams.id]);

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

  const handleCommentDelete = async (commentId) => {
    try {
      const response = await fetch(`/api/posts/${params.id}/comments/${commentId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Yorum silinirken bir hata oluştu");
        return;
      }

      // Yorumları yenile
      fetchComments();
    } catch (error) {
      console.error("Comment delete error:", error);
      setError("Yorum silinirken bir hata oluştu");
    }
  };

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [fetchPost, fetchComments]);

  if (loading) {
    return (
      <main className="min-h-screen bg-theme-bg">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Not Detay Loading Skeleton */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    {/* Kullanıcı Bilgisi Skeleton */}
                    <div className="flex items-center gap-2 mb-4">
                      <Skeleton className="w-10 h-10 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </div>
                    {/* Not İçeriği Skeleton */}
                    <div className="space-y-4">
                      <Skeleton className="h-8 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                    {/* Etiketler Skeleton */}
                    <div className="flex gap-2 mt-6">
                      <Skeleton className="h-6 w-24" />
                      <Skeleton className="h-6 w-24" />
                      <Skeleton className="h-6 w-24" />
                    </div>
                    {/* Dosyalar Skeleton */}
                    <div className="mt-6 space-y-2">
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Yorumlar Loading Skeleton */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <MessageCircle className="w-5 h-5 text-theme-text-muted" />
                <Skeleton className="h-6 w-32" />
              </div>
              
              {[...Array(3)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Skeleton className="w-8 h-8 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                        <Skeleton className="h-4 w-full" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
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
            Yorumlar {!commentsLoading && `(${comments.length})`}
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

          <div className="space-y-4 mt-6">
            {commentsLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="flex items-center gap-2 text-theme-text-muted">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Yorumlar yükleniyor...</span>
                </div>
              </div>
            ) : comments.length === 0 ? (
              <div className="text-center py-8 bg-theme-bg-secondary rounded-lg border border-theme-primary/10">
                <MessageSquare className="w-12 h-12 mx-auto text-theme-text-muted mb-2 opacity-50" />
                <p className="text-theme-text-muted">İlk yorumu siz yapın</p>
              </div>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="bg-white p-4 rounded-lg shadow-sm border border-theme-primary/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{comment.author.name}</span>
                      <span className="text-sm text-theme-text-muted">
                        {new Date(comment.createdAt).toLocaleDateString('tr-TR')}
                      </span>
                    </div>
                    {session?.user?.email === comment.author.email && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Yorumu Silmek İstediğinize Emin Misiniz?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Bu işlem geri alınamaz.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Vazgeç</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleCommentDelete(comment.id)}
                              className="bg-red-500 hover:bg-red-600"
                            >
                              Sil
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                  <p className="mt-2 text-theme-text">{comment.content}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
} 