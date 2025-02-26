'use client';

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Tag, CheckCircle, XCircle } from "lucide-react";

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

  if (!session?.user?.role === "ADMIN") {
    return (
      <main className="container mx-auto py-8 px-4">
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground">
            Bu sayfaya erişim yetkiniz yok
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Etkinlik Yönetimi</h1>

      {error && (
        <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : events.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground">
            Onay bekleyen etkinlik yok
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <Card key={event.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
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
                        <span>{event.category}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Button
                        variant="outline"
                        className="flex items-center gap-2 text-green-600 hover:text-green-700"
                        onClick={() => handleStatusUpdate(event.id, "APPROVED")}
                      >
                        <CheckCircle className="w-4 h-4" />
                        Onayla
                      </Button>
                      <Button
                        variant="outline"
                        className="flex items-center gap-2 text-red-600 hover:text-red-700"
                        onClick={() => handleStatusUpdate(event.id, "REJECTED")}
                      >
                        <XCircle className="w-4 h-4" />
                        Reddet
                      </Button>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {event.author?.name} tarafından paylaşıldı
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
} 