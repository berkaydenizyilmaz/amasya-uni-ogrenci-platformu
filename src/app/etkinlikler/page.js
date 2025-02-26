'use client';

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Header from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin, Clock, Tag, User, AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

/**
 * Etkinlikler sayfası
 * @returns {JSX.Element} Etkinlikler sayfası
 */
export default function EventsPage() {
  const { data: session } = useSession();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Filtre state
  const [filters, setFilters] = useState({
    category: "ALL",
    search: "",
  });

  // Tarih formatını düzenle
  const formatDateForInput = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // Varsayılan değerleri ayarla
  useEffect(() => {
    const now = new Date();
    const oneHourLater = new Date(now);
    oneHourLater.setHours(now.getHours() + 1);

    // Tarih formatı: YYYY-MM-DD
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    // Saat formatı: HH:mm
    const formatTime = (date) => {
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${hours}:${minutes}`;
    };

    setStartDate(formatDate(now));
    setStartTime(formatTime(now));
    setEndDate(formatDate(oneHourLater));
    setEndTime(formatTime(oneHourLater));
  }, []);

  // Tarih ve saati birleştir
  const combineDateTimeForSubmit = (date, time) => {
    if (!date || !time) return null;
    return new Date(`${date}T${time}`).toISOString();
  };

  // Etkinlikleri getir
  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/events");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Etkinlikler yüklenirken bir hata oluştu");
      }

      setEvents(data);
    } catch (error) {
      console.error("Events fetch error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Form gönderme
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const startDateTime = combineDateTimeForSubmit(startDate, startTime);
    const endDateTime = combineDateTimeForSubmit(endDate, endTime);

    if (!startDateTime || !endDateTime) {
      setError("Lütfen tarih ve saat alanlarını doldurun");
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          startDate: startDateTime,
          endDate: endDateTime,
          location,
          category,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Etkinlik paylaşılırken bir hata oluştu");
      }

      // Formu sıfırla
      setTitle("");
      setDescription("");
      setStartDate("");
      setStartTime("");
      setEndDate("");
      setEndTime("");
      setLocation("");
      setCategory("");
      setIsDialogOpen(false);

      // Etkinlikleri yenile
      fetchEvents();
    } catch (error) {
      console.error("Event create error:", error);
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Etkinlik durumuna göre renk belirleme
  const getStatusColor = (status) => {
    switch (status) {
      case "APPROVED":
        return "text-green-600";
      case "REJECTED":
        return "text-red-600";
      default:
        return "text-yellow-600";
    }
  };

  // Etkinlik durumunu Türkçe'ye çevir
  const getStatusLabel = (status) => {
    switch (status) {
      case "APPROVED":
        return "Onaylandı";
      case "REJECTED":
        return "Reddedildi";
      default:
        return "Onay Bekliyor";
    }
  };

  // Kategori etiketini Türkçe'ye çevir
  const getCategoryLabel = (category) => {
    switch (category) {
      case "AKADEMIK":
        return "Akademik";
      case "KULTUR":
        return "Kültür & Sanat";
      case "SPOR":
        return "Spor";
      case "SOSYAL":
        return "Sosyal";
      case "DIGER":
        return "Diğer";
      default:
        return category;
    }
  };

  // Filtrelenmiş etkinlikler
  const filteredEvents = events.filter((event) => {
    const matchesCategory = !filters.category || filters.category === "ALL" || event.category === filters.category;
    const matchesSearch = !filters.search || 
      event.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      event.description.toLowerCase().includes(filters.search.toLowerCase()) ||
      event.location.toLowerCase().includes(filters.search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-theme-bg">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8">
          {/* Başlık ve Açıklama */}
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Etkinlikler</h1>
            <p className="text-muted-foreground">
              Üniversitemizdeki etkinlikleri takip edin ve yeni etkinlikler paylaşın
            </p>
          </div>

          {/* Filtreler */}
          <Card className="border-theme-primary/10">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Etkinlik ara..."
                    value={filters.search}
                    onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                    className="border-theme-primary/20"
                  />
                </div>
                <Select
                  value={filters.category}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger className="w-[180px] border-theme-primary/20">
                    <SelectValue placeholder="Kategori seç" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">Tümü</SelectItem>
                    <SelectItem value="AKADEMIK">Akademik</SelectItem>
                    <SelectItem value="KULTUR">Kültür & Sanat</SelectItem>
                    <SelectItem value="SPOR">Spor</SelectItem>
                    <SelectItem value="SOSYAL">Sosyal</SelectItem>
                    <SelectItem value="DIGER">Diğer</SelectItem>
                  </SelectContent>
                </Select>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-theme-primary hover:bg-theme-primary-hover text-white flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Etkinlik Paylaş
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Etkinlik Paylaş</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="title" className="text-sm font-medium">
                          Başlık
                        </label>
                        <Input
                          id="title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          required
                          className="border-theme-primary/20"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="description" className="text-sm font-medium">
                          Açıklama
                        </label>
                        <Textarea
                          id="description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          required
                          className="border-theme-primary/20"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="startDate" className="text-sm font-medium">
                          Başlangıç Tarihi ve Saati
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <Input
                            id="startDate"
                            type="date"
                            value={startDate}
                            onChange={(e) => {
                              setStartDate(e.target.value);
                              if ((!endDate || endDate < e.target.value)) {
                                setEndDate(e.target.value);
                              }
                            }}
                            min={new Date().toISOString().split('T')[0]}
                            required
                            className="border-theme-primary/20"
                          />
                          <Input
                            id="startTime"
                            type="time"
                            value={startTime}
                            onChange={(e) => {
                              setStartTime(e.target.value);
                              if (!endTime) setEndTime(e.target.value);
                            }}
                            required
                            className="border-theme-primary/20"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="endDate" className="text-sm font-medium">
                          Bitiş Tarihi ve Saati
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <Input
                            id="endDate"
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            min={startDate || new Date().toISOString().split('T')[0]}
                            required
                            className="border-theme-primary/20"
                          />
                          <Input
                            id="endTime"
                            type="time"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            required
                            className="border-theme-primary/20"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="location" className="text-sm font-medium">
                          Konum
                        </label>
                        <Input
                          id="location"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          required
                          className="border-theme-primary/20"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="category" className="text-sm font-medium">
                          Kategori
                        </label>
                        <Select value={category} onValueChange={setCategory} required>
                          <SelectTrigger className="border-theme-primary/20">
                            <SelectValue placeholder="Kategori seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="AKADEMIK">Akademik</SelectItem>
                            <SelectItem value="KULTUR">Kültür & Sanat</SelectItem>
                            <SelectItem value="SPOR">Spor</SelectItem>
                            <SelectItem value="SOSYAL">Sosyal</SelectItem>
                            <SelectItem value="DIGER">Diğer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {error && (
                        <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 p-3 rounded-lg">
                          <AlertCircle className="w-4 h-4" />
                          <span>{error}</span>
                        </div>
                      )}

                      <Button
                        type="submit"
                        className="w-full bg-theme-primary hover:bg-theme-primary-hover text-white"
                        disabled={submitting || !session}
                      >
                        {submitting ? "Paylaşılıyor..." : "Etkinlik Paylaş"}
                      </Button>

                      {!session && (
                        <p className="text-sm text-muted-foreground text-center">
                          Etkinlik paylaşmak için giriş yapmalısınız
                        </p>
                      )}
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          {/* Etkinlikler Listesi */}
          <div className="space-y-6">
            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <Card key={i} className="border-theme-primary/10">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
                        <div className="flex-1 space-y-4">
                          <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                          <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
                          <div className="grid grid-cols-2 gap-4">
                            <div className="h-3 bg-gray-200 rounded animate-pulse" />
                            <div className="h-3 bg-gray-200 rounded animate-pulse" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredEvents.length === 0 ? (
              <Card className="border-theme-primary/10">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Calendar className="w-12 h-12 opacity-50" />
                    <p>Henüz etkinlik paylaşılmamış</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredEvents.map((event) => (
                  <Card key={event.id} className="border-theme-primary/10 hover:shadow-lg transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-theme-primary/10 flex items-center justify-center text-theme-primary">
                          <User className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="text-xl font-semibold mb-1">
                                {event.title}
                              </h3>
                              <p className="text-sm text-muted-foreground mb-1">
                                {event.author?.name} tarafından paylaşıldı
                              </p>
                            </div>
                            <div className={`text-sm ${getStatusColor(event.status)}`}>
                              {getStatusLabel(event.status)}
                            </div>
                          </div>
                          <p className="text-muted-foreground mb-4">
                            {event.description}
                          </p>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="w-4 h-4" />
                              <span>
                                {new Date(event.startDate).toLocaleDateString("tr-TR")}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="w-4 h-4" />
                              <span>
                                {new Date(event.startDate).toLocaleTimeString("tr-TR", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="w-4 h-4" />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Tag className="w-4 h-4" />
                              <span>{getCategoryLabel(event.category)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
} 