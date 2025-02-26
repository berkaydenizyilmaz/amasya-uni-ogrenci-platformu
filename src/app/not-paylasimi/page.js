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
import { Skeleton } from "@/components/ui/skeleton";
import { PlusCircle, MessageCircle, Calendar, FileText, X, Bookmark, BookmarkCheck, Trash2, BookCopy } from "lucide-react";
import Link from "next/link";
import { t } from "@/lib/i18n";
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

const FACULTIES = {
  "Eğitim Fakültesi": [
    "Matematik ve Fen Bilimleri Eğitimi",
    "Temel Eğitim",
    "Türkçe ve Sosyal Bilimler Eğitimi",
    "Özel Eğitim",
    "Eğitim Bilimleri",
    "Yabancı Dil Eğitimi"
  ],
  "Fen Edebiyat Fakültesi": [
    "Matematik",
    "Fizik",
    "Kimya",
    "Biyoloji",
    "Türk Dili ve Edebiyatı",
    "Tarih",
    "Coğrafya"
  ],
  "Mühendislik Fakültesi": [
    "Bilgisayar Mühendisliği",
    "Elektrik-Elektronik Mühendisliği",
    "İnşaat Mühendisliği",
    "Makine Mühendisliği"
  ],
  "İktisadi ve İdari Bilimler Fakültesi": [
    "İşletme",
    "İktisat",
    "Siyaset Bilimi ve Kamu Yönetimi",
    "Uluslararası İlişkiler"
  ],
  "Sağlık Bilimleri Fakültesi": [
    "Hemşirelik",
    "Ebelik",
    "Beslenme ve Diyetetik",
    "Fizyoterapi ve Rehabilitasyon"
  ],
  "Mimarlık Fakültesi": [
    "Mimarlık",
    "Şehir ve Bölge Planlama"
  ],
  "Tıp Fakültesi": [
    "Tıp"
  ],
  "İlahiyat Fakültesi": [
    "İlahiyat"
  ],
  "Güzel Sanatlar Fakültesi": [
    "Geleneksel Türk Sanatları",
    "Resim",
    "Grafik Tasarım"
  ]
};

const DEPARTMENTS = {
  education: [
    "Matematik ve Fen Bilimleri Eğitimi",
    "Temel Eğitim",
    "Türkçe ve Sosyal Bilimler Eğitimi",
    "Özel Eğitim",
    "Eğitim Bilimleri",
    "Yabancı Dil Eğitimi"
  ],
  arts: [
    "Matematik",
    "Fizik",
    "Kimya",
    "Biyoloji",
    "Türk Dili ve Edebiyatı",
    "Tarih",
    "Coğrafya"
  ],
  engineering: [
    "Bilgisayar Mühendisliği",
    "Elektrik-Elektronik Mühendisliği",
    "İnşaat Mühendisliği",
    "Makine Mühendisliği"
  ],
  // ... Diğer bölümler eklenecek
};

/**
 * Not paylaşım ana sayfası
 * @returns {JSX.Element} Not paylaşım sayfası
 */
export default function NotesPage() {
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileError, setFileError] = useState("");
  const [showBookmarked, setShowBookmarked] = useState(false);
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
  const [filters, setFilters] = useState({
    faculty: "",
    department: "",
    category: "",
    search: ""
  });
  const [availableDepartments, setAvailableDepartments] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("DERS_NOTU");

  const fetchPosts = async () => {
    setLoading(true);
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

  const fetchBookmarkedPosts = async () => {
    try {
      const response = await fetch("/api/bookmarks");
      const data = await response.json();
      if (response.ok) {
        setBookmarkedPosts(data.map(bookmark => bookmark.postId));
      }
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
    }
  };

  const handleBookmark = async (postId) => {
    if (!session) {
      setError("Kaydetmek için giriş yapmalısınız");
      return;
    }

    try {
      const response = await fetch("/api/bookmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId }),
      });

      if (response.ok) {
        fetchBookmarkedPosts();
      } else {
        throw new Error("Kaydetme işlemi başarısız");
      }
    } catch (error) {
      setError(error.message);
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
    setLoading(true);
    setError("");

    const title = e.target.title.value;
    const content = e.target.content.value;

    // Fakülte ve bölüm kontrolü
    if (!selectedFaculty) {
      setError("Lütfen bir fakülte seçin");
      setLoading(false);
      return;
    }

    if (!selectedDepartment) {
      setError("Lütfen bir bölüm seçin");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", selectedCategory);
    formData.append("faculty", selectedFaculty);
    formData.append("department", selectedDepartment);

    // Dosyaları ekle
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });

    try {
      console.log("Form data:", {
        title,
        content,
        category: selectedCategory,
        faculty: selectedFaculty,
        department: selectedDepartment
      });

      const response = await fetch("/api/posts", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Not paylaşılırken bir hata oluştu");
      }

      // Başarılı
      setIsDialogOpen(false);
      setSelectedFiles([]);
      setSelectedFaculty("");
      setSelectedDepartment("");
      setAvailableDepartments([]);
      e.target.reset();
      await fetchPosts();
    } catch (error) {
      console.error("Form submission error:", error);
      setError(error.message || "Not paylaşılırken bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  const handleFacultyChange = (value) => {
    setSelectedFaculty(value);
    setSelectedDepartment("");
    setAvailableDepartments(FACULTIES[value] || []);
    setFilters(prev => ({ ...prev, faculty: value, department: "" }));
  };

  const handleDepartmentChange = (value) => {
    setSelectedDepartment(value);
    setFilters(prev => ({ ...prev, department: value }));
  };

  const handleDelete = async (postId) => {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Not silinirken bir hata oluştu");
        return;
      }

      setError("");
      fetchPosts(); // Notları yenile
      fetchBookmarkedPosts(); // Kaydedilen notları yenile
    } catch (error) {
      console.error("Delete error:", error);
      setError("Not silinirken bir hata oluştu");
    }
  };

  const filteredPosts = posts.filter(post => {
    if (showBookmarked && !bookmarkedPosts.includes(post.id)) return false;
    
    if (filters.faculty && post.faculty !== filters.faculty) return false;
    if (filters.department && post.department !== filters.department) return false;
    if (filters.category && post.category !== filters.category) return false;
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return (
        post.title.toLowerCase().includes(searchLower) ||
        post.content.toLowerCase().includes(searchLower) ||
        post.author.name.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });

  useEffect(() => {
    setMounted(true);
    setLoading(true);
    fetchPosts();
    if (session) {
      fetchBookmarkedPosts();
    }
  }, [session]);

  const getCategoryLabel = (category) => {
    const categories = {
      DERS_NOTU: "Ders Notu",
      SINAV_NOTU: "Sınav Notu",
      OZET: "Özet",
      KAYNAK: "Kaynak"
    };
    return categories[category] || category;
  };

  if (!mounted) {
    return null;
  }

  return (
    <main className="min-h-screen bg-theme-bg">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Filtreleme Alanı */}
        <div className="mb-8 space-y-4">
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4">
              {error}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select value={filters.faculty} onValueChange={handleFacultyChange}>
              <SelectTrigger>
                <SelectValue placeholder="Fakülte seçin" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(FACULTIES).map((faculty) => (
                  <SelectItem key={faculty} value={faculty}>
                    {faculty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select 
              value={filters.department} 
              onValueChange={handleDepartmentChange}
              disabled={!filters.faculty}
            >
              <SelectTrigger>
                <SelectValue placeholder="Bölüm seçin" />
              </SelectTrigger>
              <SelectContent>
                {availableDepartments.map(dept => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select 
              value={filters.category} 
              onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}
            >
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

            <Input
              placeholder="Ara..."
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            />
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Button
                variant={showBookmarked ? "default" : "outline"}
                onClick={() => setShowBookmarked(!showBookmarked)}
                className="flex items-center gap-2"
              >
                {showBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                {showBookmarked ? "Tüm Notlar" : "Kaydedilenler"}
              </Button>

              <Button
                variant="outline"
                onClick={() => {
                  setFilters({
                    faculty: "",
                    department: "",
                    category: "",
                    search: ""
                  });
                  setAvailableDepartments([]);
                  setShowBookmarked(false);
                }}
                className="flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Filtreleri Temizle
              </Button>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-theme-primary hover:bg-theme-primary-hover text-white flex items-center gap-2">
                  <PlusCircle className="w-4 h-4" />
                  Not Paylaş
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Not Paylaş</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="faculty" className="text-sm font-medium">
                        Fakülte
                      </label>
                      <Select 
                        value={selectedFaculty}
                        onValueChange={(value) => {
                          setSelectedFaculty(value);
                          setSelectedDepartment("");
                          setAvailableDepartments(FACULTIES[value] || []);
                        }}
                        required
                      >
                        <SelectTrigger id="faculty">
                          <SelectValue placeholder="Fakülte seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(FACULTIES).map((faculty) => (
                            <SelectItem key={faculty} value={faculty}>
                              {faculty}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="department" className="text-sm font-medium">
                        Bölüm
                      </label>
                      <Select 
                        value={selectedDepartment}
                        onValueChange={(value) => {
                          setSelectedDepartment(value);
                        }}
                        disabled={!selectedFaculty}
                        required
                      >
                        <SelectTrigger id="department">
                          <SelectValue placeholder="Bölüm seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableDepartments.map((department) => (
                            <SelectItem key={department} value={department}>
                              {department}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="category" className="text-sm font-medium">
                      Kategori
                    </label>
                    <Select 
                      value={selectedCategory}
                      onValueChange={setSelectedCategory}
                      required
                    >
                      <SelectTrigger id="category">
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
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      className="w-full bg-theme-primary hover:bg-theme-primary-hover text-white transition-colors"
                      disabled={loading}
                    >
                      {loading ? "Paylaşılıyor..." : "Paylaş"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Notlar Listesi */}
        <div className="grid grid-cols-1 gap-6">
          {loading ? (
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Skeleton className="w-8 h-8 rounded-full" />
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-3 w-16" />
                          </div>
                        </div>
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-full mb-4" />
                        <div className="flex gap-2">
                          <Skeleton className="h-6 w-20" />
                          <Skeleton className="h-6 w-20" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-8 w-8" />
                        <Skeleton className="h-8 w-8" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-theme-primary/10">
                      <div className="flex items-center gap-4">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                      <Skeleton className="h-6 w-24" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-8">
              <div className="flex flex-col items-center gap-4 text-theme-text-muted">
                <BookCopy className="w-12 h-12 opacity-50" />
                <p>Henüz not paylaşılmamış</p>
              </div>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-all">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback>
                            {post.author.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-theme-text-muted">{post.author.name}</span>
                        <span className="text-sm text-theme-text-muted">•</span>
                        <span className="text-sm text-theme-text-muted">
                          {new Date(post.createdAt).toLocaleDateString('tr-TR')}
                        </span>
                      </div>
                      <Link href={`/not-paylasimi/${post.id}`} className="block group">
                        <h3 className="text-lg font-semibold mb-1 group-hover:text-theme-primary transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-sm text-theme-text-muted line-clamp-2 mb-2">
                          {post.content}
                        </p>
                        <div className="flex flex-wrap items-center gap-2">
                          {post.faculty && (
                            <span className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded">
                              {post.faculty}
                            </span>
                          )}
                          {post.department && (
                            <span className="text-xs px-2 py-1 bg-green-50 text-green-600 rounded">
                              {post.department}
                            </span>
                          )}
                        </div>
                      </Link>
                    </div>
                    <div className="flex flex-row gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleBookmark(post.id)}
                        className={`w-8 h-8 p-0 ${bookmarkedPosts.includes(post.id) ? "text-theme-primary" : ""}`}
                      >
                        {bookmarkedPosts.includes(post.id) ? (
                          <BookmarkCheck className="w-3 h-3" />
                        ) : (
                          <Bookmark className="w-3 h-3" />
                        )}
                      </Button>
                      {session?.user?.email === post.author.email ? (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="destructive"
                              size="sm"
                              className="hover:bg-red-600 w-8 h-8 p-0"
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
                                onClick={() => handleDelete(post.id)}
                                className="bg-red-500 hover:bg-red-600"
                              >
                                Sil
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-theme-primary/10">
                    <div className="flex items-center gap-4">
                      <Link
                        href={`/not-paylasimi/${post.id}`}
                        className="flex items-center gap-1 text-xs text-theme-text-muted hover:text-theme-primary transition-colors"
                      >
                        <MessageCircle className="w-3 h-3" />
                        {post._count.comments} Yorum
                      </Link>
                      {post.files && post.files.length > 0 && (
                        <span className="flex items-center gap-1 text-xs text-theme-text-muted">
                          <FileText className="w-3 h-3" />
                          {post.files.length} Dosya
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 bg-theme-primary/10 text-theme-primary rounded">
                        {getCategoryLabel(post.category)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </main>
  );
} 