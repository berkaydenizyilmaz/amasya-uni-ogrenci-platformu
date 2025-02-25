'use client';

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, MessageCircle, Calendar, User, FileText, X } from "lucide-react";
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

    // Dosya kontrolü
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

      if (!response.ok) {
        throw new Error("Not paylaşılırken bir hata oluştu");
      }

      setIsDialogOpen(false);
      setSelectedFiles([]);
      fetchPosts();
    } catch (error) {
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
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-theme-primary to-theme-primary-hover py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-theme-bg mb-6">
            Not Paylaşım Platformu
          </h1>
          <p className="text-xl text-theme-bg/90 max-w-2xl mx-auto mb-8">
            Ders notlarınızı paylaşın, arkadaşlarınızla bilgi alışverişinde bulunun
          </p>
          {session ? (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-theme-bg text-theme-primary hover:bg-theme-bg/90">
                  <PlusCircle className="w-5 h-5 mr-2" />
                  Not Paylaş
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Yeni Not Paylaş</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium">
                      Başlık
                    </label>
                    <Input
                      id="title"
                      name="title"
                      required
                      placeholder="Not başlığı"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="category" className="text-sm font-medium">
                      Kategori
                    </label>
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
                    <label htmlFor="content" className="text-sm font-medium">
                      İçerik
                    </label>
                    <Textarea
                      id="content"
                      name="content"
                      required
                      placeholder="Not içeriği"
                      rows={5}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Dosyalar
                    </label>
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
          ) : (
            <Button asChild className="bg-theme-bg text-theme-primary hover:bg-theme-bg/90">
              <Link href="/giris">
                Paylaşım yapmak için giriş yapın
              </Link>
            </Button>
          )}
        </div>
      </section>

      {/* Posts Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center text-theme-text-muted">Yükleniyor...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : posts.length === 0 ? (
            <div className="text-center text-theme-text-muted">Henüz paylaşılan not bulunmuyor</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link key={post.id} href={`/not-paylasimi/${post.id}`}>
                  <Card className="h-full hover:shadow-lg transition-all cursor-pointer border-theme-primary/10">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 text-theme-text-muted">
                          <User className="w-4 h-4" />
                          <span className="text-sm">{post.author.name}</span>
                        </div>
                        <div className="flex items-center gap-1 text-theme-text-muted">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">
                            {new Date(post.createdAt).toLocaleDateString('tr-TR')}
                          </span>
                        </div>
                      </div>
                      <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-theme-text-muted line-clamp-3 mb-4">
                        {post.content}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-theme-text-muted" />
                          <span className="text-sm text-theme-text-muted">
                            {post.files.length} dosya
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MessageCircle className="w-4 h-4 text-theme-text-muted" />
                          <span className="text-sm text-theme-text-muted">
                            {post._count.comments} yorum
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
} 