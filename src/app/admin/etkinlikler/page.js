'use client';

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Header from "@/components/header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Tag, User, CheckCircle, XCircle, AlertCircle } from "lucide-react";

/**
 * Admin etkinlik yönetim sayfası
 * @returns {JSX.Element} Admin etkinlik yönetim sayfası
 */
export default function AdminEventsPage() {
  const { data: session } = useSession();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Etkinlikleri getir
  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/admin/events");
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

  // Etkinlik durumunu güncelle
  const handleStatusUpdate = async (eventId, status) => {
    try {
      const response = await fetch(`/api/admin/events/${eventId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Etkinlik güncellenirken bir hata oluştu");
      }

      // Etkinlikleri yenile
      fetchEvents();
    } catch (error) {
      console.error("Event update error:", error);
      setError(error.message);
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

  if (!session?.user?.role === "ADMIN") {
    return (
      <main className="min-h-screen bg-theme-bg">
        <Header />
        <div className="container mx-auto py-8 px-4">
          <Card className="border-theme-primary/10">
            <CardContent className="p-6 text-center text-muted-foreground">
              Bu sayfaya erişim yetkiniz yok
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-theme-bg">
      <Header />
      
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col gap-8">
          {/* Başlık ve Açıklama */}
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Etkinlik Yönetimi</h1>
            <p className="text-muted-foreground">
              Paylaşılan etkinlikleri onaylayın veya reddedin
            </p>
          </div>

          {error && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-4 flex items-center gap-2 text-red-600">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </CardContent>
            </Card>
          )}

          {/* Etkinlikler Listesi */}
          <div className="space-y-4">
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
            ) : events.length === 0 ? (
              <Card className="border-theme-primary/10">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Calendar className="w-12 h-12 opacity-50" />
                    <p>Onay bekleyen etkinlik yok</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {events.map((event) => (
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
                          </div>
                          <p className="text-muted-foreground mb-4">
                            {event.description}
                          </p>
                          <div className="grid grid-cols-2 gap-4 mb-4">
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
                          <div className="flex items-center gap-4">
                            <Button
                              variant="outline"
                              className="flex items-center gap-2 text-green-600 hover:text-green-700 hover:bg-green-50"
                              onClick={() => handleStatusUpdate(event.id, "APPROVED")}
                            >
                              <CheckCircle className="w-4 h-4" />
                              Onayla
                            </Button>
                            <Button
                              variant="outline"
                              className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => handleStatusUpdate(event.id, "REJECTED")}
                            >
                              <XCircle className="w-4 h-4" />
                              Reddet
                            </Button>
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