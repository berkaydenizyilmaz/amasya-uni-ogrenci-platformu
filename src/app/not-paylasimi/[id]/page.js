'use client';

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, User, MessageCircle, FileText, Download } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

/**
 * Not detay sayfası
 * @returns {JSX.Element} Not detay sayfası
 */
export default function NoteDetailPage() {
  const { data: session, status } = useSession();
  const params = useParams();
  const [mounted, setMounted] = useState(false);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [comment, setComment] = useState("");

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/posts/${params.id}`);
      const data = await response.json();
      setPost(data);
    } catch (error) {
      setError("Not yüklenirken bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/posts/${params.id}/comments`);
      const data = await response.json();
      setComments(data);
    } catch (error) {
      setError("Yorumlar yüklenirken bir hata oluştu");
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`/api/posts/${params.id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
        }),
      });

      if (!response.ok) {
        throw new Error("Yorum paylaşılırken bir hata oluştu");
      }

      setComment("");
      fetchComments();
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    setMounted(true);
    fetchPost();
    fetchComments();
  }, []);

  if (!mounted) {
    return null;
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-theme-bg">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-theme-text-muted">Yükleniyor...</div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-theme-bg">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-red-500">{error}</div>
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="min-h-screen bg-theme-bg">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-theme-text-muted">Not bulunamadı</div>
        </div>
      </main>
    );
  }

  const getFileIcon = (type) => {
    switch (type) {
      case 'PDF':
        return '📄';
      case 'IMAGE':
        return '🖼️';
      case 'WORD':
        return '📝';
      case 'EXCEL':
        return '📊';
      case 'POWERPOINT':
        return '📽️';
      default:
        return '📎';
    }
  };

  return (
    <main className="min-h-screen bg-theme-bg">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-theme-text-muted" />
                <span className="text-theme-text-muted">{post.author.name}</span>
              </div>
              <div className="flex items-center gap-1 text-theme-text-muted">
                <Calendar className="w-5 h-5" />
                {new Date(post.createdAt).toLocaleDateString('tr-TR')}
              </div>
            </div>
            <CardTitle className="text-2xl md:text-3xl">{post.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-theme max-w-none mb-8">
              {post.content}
            </div>

            {/* Dosyalar */}
            {post.files && post.files.length > 0 && (
              <div className="border-t border-theme-primary/10 pt-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Dosyalar
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {post.files.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between bg-theme-primary/5 rounded-lg p-4"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl" role="img" aria-label={file.type}>
                          {getFileIcon(file.type)}
                        </span>
                        <div>
                          <p className="font-medium truncate">{file.name}</p>
                          <p className="text-sm text-theme-text-muted">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <a
                        href={file.url}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-theme-primary/10 rounded-full transition-colors"
                      >
                        <Download className="w-5 h-5" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Yorumlar */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Yorumlar ({comments.length})
          </h2>

          {session ? (
            <form onSubmit={handleCommentSubmit} className="mb-6">
              <div className="space-y-4">
                <Textarea
                  placeholder="Yorumunuzu yazın..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                />
                {error && (
                  <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
                    {error}
                  </div>
                )}
                <Button type="submit">Yorum Yap</Button>
              </div>
            </form>
          ) : (
            <Card className="mb-6 bg-theme-primary/5 border-theme-primary/10">
              <CardContent className="p-4">
                <p className="text-theme-text-muted text-center">
                  Yorum yapmak için{" "}
                  <Link href="/giris" className="text-theme-primary hover:underline">
                    giriş yapın
                  </Link>
                </p>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            {comments.map((comment) => (
              <Card key={comment.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-theme-text-muted" />
                      <span className="text-theme-text-muted text-sm">
                        {comment.author.name}
                      </span>
                    </div>
                    <span className="text-theme-text-muted text-sm">
                      {new Date(comment.createdAt).toLocaleDateString('tr-TR')}
                    </span>
                  </div>
                  <p className="text-theme-text">{comment.content}</p>
                </CardContent>
              </Card>
            ))}

            {comments.length === 0 && (
              <div className="text-center text-theme-text-muted">
                Henüz yorum yapılmamış
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
} 