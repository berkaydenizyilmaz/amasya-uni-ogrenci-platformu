'use client';

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PlusCircle, MessageCircle, Calendar, FileText, X, Heart, Share2, Bookmark } from "lucide-react";
import Link from "next/link";
import { t } from "@/lib/i18n";

/**
 * Not paylaşım ana sayfası
 * @returns {JSX.Element} Not paylaşım sayfası
 */
export default function NotesPage() {
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileError, setFileError] = useState("");

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/posts");
      const data = await response.json();
      
      console.log("API Response:", data);

      if (!data || !Array.isArray(data)) {
        console.error("Invalid data format:", data);
        throw new Error("Geçersiz veri formatı");
      }

      setPosts(data);
    } catch (error) {
      console.error("Posts fetch error:", error);
      setError("Notlar yüklenirken bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    ];

    const invalidFiles = files.filter(
      file => !allowedTypes.includes(file.type) || file.size > maxSize
    );

    if (invalidFiles.length > 0) {
      setFileError("Geçersiz dosya formatı veya boyutu çok büyük (max: 10MB)");
      return;
    }

    setFileError("");
    setSelectedFiles(prevFiles => [...prevFiles, ...files]);
  };

  const removeFile = (index) => {
    setSelectedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData();
    formData.append("title", e.target.title.value);
    formData.append("content", e.target.content.value);
    formData.append("category", e.target.category.value);
    
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Not paylaşılırken bir hata oluştu");
      }

      console.log("API Response:", data);

      setIsDialogOpen(false);
      setSelectedFiles([]);
      fetchPosts();
    } catch (error) {
      console.error("Post error:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    setMounted(true);
    fetchPosts();
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <main className="min-h-screen bg-theme-bg">
      <Header />
      
      {/* Ana İçerik */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Not Paylaş Kartı */}
          {session ? (
            <Card className="mb-8 border-theme-primary/10 bg-white">
              <CardContent className="p-4">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <div className="flex items-center gap-4 cursor-pointer">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback>
                          {session.user.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 p-3 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors">
                        <span className="text-theme-text-muted">Not paylaşmak için tıkla...</span>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Yeni Not Paylaş</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Input
                          id="title"
                          name="title"
                          required
                          placeholder="Not başlığı"
                        />
                      </div>
                      <div className="space-y-2">
                        <Select name="category" required>
                          <SelectTrigger>
                            <SelectValue placeholder="Kategori seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="DERS_NOTU">Ders Notu</SelectItem>
                            <SelectItem value="SINAV_NOTU">Sınav Notu</SelectItem>
                            <SelectItem value="OZET">Özet</SelectItem>
                            <SelectItem value="KAYNAK">Kaynak</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Textarea
                          id="content"
                          name="content"
                          required
                          placeholder="Not içeriği"
                          rows={5}
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="border-2 border-dashed border-theme-primary/20 rounded-lg p-4">
                          <Input
                            type="file"
                            onChange={handleFileChange}
                            multiple
                            accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png"
                            className="mb-2"
                          />
                          <p className="text-xs text-theme-text-muted">
                            Desteklenen formatlar: PDF, Word, Excel, PowerPoint, JPEG, PNG (max: 10MB)
                          </p>
                          {fileError && (
                            <p className="text-red-500 text-sm mt-1">{fileError}</p>
                          )}
                          {selectedFiles.length > 0 && (
                            <div className="mt-4 space-y-2">
                              {selectedFiles.map((file, index) => (
                                <div key={index} className="flex items-center justify-between bg-theme-primary/5 rounded p-2">
                                  <div className="flex items-center gap-2">
                                    <FileText className="w-4 h-4" />
                                    <span className="text-sm truncate">{file.name}</span>
                                  </div>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeFile(index)}
                                  >
                                    <X className="w-4 h-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      {error && (
                        <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
                          {error}
                        </div>
                      )}
                      <div className="flex justify-end">
                        <Button type="submit">Paylaş</Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ) : (
            <Card className="mb-8 border-theme-primary/10 bg-white">
              <CardContent className="p-6 text-center">
                <p className="text-theme-text-muted mb-4">
                  Not paylaşmak için giriş yapmalısınız
                </p>
                <Button asChild variant="default">
                  <Link href="/giris">Giriş Yap</Link>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Notlar Listesi */}
          {loading ? (
            <div className="text-center text-theme-text-muted">Yükleniyor...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : posts.length === 0 ? (
            <div className="text-center text-theme-text-muted">Henüz paylaşılan not bulunmuyor</div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <Card key={post.id} className="border-theme-primary/10 bg-white hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    {/* Kullanıcı Bilgisi */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback>
                            {post.author.name?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-theme-text">{post.author.name}</p>
                          <p className="text-sm text-theme-text-muted">
                            {new Date(post.createdAt).toLocaleDateString('tr-TR')}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Share2 className="w-5 h-5 text-theme-text-muted" />
                      </Button>
                    </div>

                    {/* İçerik */}
                    <Link href={`/not-paylasimi/${post.id}`}>
                      <div className="space-y-2 mb-4">
                        <h3 className="text-lg font-semibold text-theme-text hover:text-theme-primary transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-theme-text-muted line-clamp-3">
                          {post.content}
                        </p>
                      </div>
                    </Link>

                    {/* Dosyalar */}
                    {post.files.length > 0 && (
                      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2 text-sm text-theme-text-muted mb-2">
                          <FileText className="w-4 h-4" />
                          <span>{post.files.length} dosya</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {post.files.slice(0, 2).map((file) => (
                            <div
                              key={file.id}
                              className="flex items-center gap-2 p-2 bg-white rounded border border-gray-100"
                            >
                              <FileText className="w-4 h-4 text-theme-primary" />
                              <span className="text-sm truncate">{file.name}</span>
                            </div>
                          ))}
                          {post.files.length > 2 && (
                            <div className="text-sm text-theme-primary">
                              +{post.files.length - 2} daha
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Etkileşim Butonları */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-6">
                        <Button variant="ghost" size="sm" className="text-theme-text-muted hover:text-red-500">
                          <Heart className="w-5 h-5 mr-2" />
                          <span>Beğen</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="text-theme-text-muted hover:text-theme-primary">
                          <MessageCircle className="w-5 h-5 mr-2" />
                          <span>{post._count.comments}</span>
                        </Button>
                      </div>
                      <Button variant="ghost" size="sm" className="text-theme-text-muted hover:text-theme-primary">
                        <Bookmark className="w-5 h-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 