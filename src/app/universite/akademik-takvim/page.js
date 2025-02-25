'use client';

import { useEffect, useState } from "react";
import Header from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { t } from "@/lib/i18n";

/**
 * Akademik Takvim sayfası
 * @returns {JSX.Element} Akademik Takvim sayfası
 */
export default function AcademicCalendar() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const calendar = {
    preparatory: [
      {
        title: "Yeterlilik/Seviye Belirleme Sınavı",
        subtitle: "(Yabancı Dil Hazırlık Sınıfı Okuyan Öğrenciler için)",
        date: "09-10 Eylül 2024",
        additionalInfo: "11 Eylül 2024 Sonuç Açıklama"
      },
      {
        title: "Ders Kayıtları",
        subtitle: "(Yeterlilik Sınavında Başarılı Olan Öğrenciler için)",
        date: "12-13 Eylül 2024"
      }
    ],
    exams: [
      {
        title: "Yabancı Dil Muafiyet Sınavı",
        subtitle: "(Hazırlık sınıfı olmayan Fakülte ve Yüksekokul öğrencilerine yöneliktir. Amaç Zorunlu Yabancı Dil dersinden muaf olacak düzeyde yabancı dil bilenleri tespit etmektir.)",
        date: "6 Ekim 2024"
      },
      {
        title: "Temel Bilgi Teknolojileri Kullanımı Muafiyet Sınavı",
        subtitle: "(Bilgisayar Dersinden muaf olacak öğrencileri tespit etmek için Yapılan Sınav)",
        date: "6 Ekim 2024"
      },
      {
        title: "Yabancı Uyruklu Öğrencilerin Türkçe Yeterlilik Sınavı",
        date: "09-27 Eylül 2024"
      }
    ],
    fall: {
      title: "GÜZ DÖNEMİ",
      events: [
        {
          title: "Katkı Payı Öğrenim Ücretinin 1 nci ve 2 nci Taksitinin Ödenmesi",
          start: "02 Eylül 2024",
          end: "13 Eylül 2024"
        },
        {
          title: "Ders Kaydı",
          start: "09 Eylül 2024",
          end: "13 Eylül 2024"
        },
        {
          title: "Danışman Onayı",
          start: "09 Eylül 2024",
          end: "15 Eylül 2024"
        },
        {
          title: "Derslerin Başlama/Bitiş Tarihleri",
          start: "16 Eylül 2024",
          end: "10 Ocak 2025"
        },
        {
          title: "Ders Ekleme,Silme, Mazeretli Ders Kaydı Baş.ve Ders Kayıt Tarihleri",
          start: "23 Eylül 2024",
          end: "27 Eylül 2024"
        },
        {
          title: "Ara Sınavlar",
          start: "2 Kasım 2024",
          end: "17 Kasım 2024"
        },
        {
          title: "Ara Sınav Not Giriş Tarihleri",
          start: "2 Kasım 2024",
          end: "08 Ocak 2025"
        },
        {
          title: "Yarıyıl Sonu Sınav Tarihleri",
          start: "13 Ocak 2025",
          end: "26 Ocak 2025"
        },
        {
          title: "Yarıyıl Sonu Sınav Sonuçlarının Giriş Tarihleri",
          start: "13 Ocak 2025",
          end: "26 Ocak 2025"
        },
        {
          title: "Bütünleme Sınavları",
          start: "27 Ocak 2025",
          end: "02 Şubat 2025"
        },
        {
          title: "Bütünleme Sınav Sonuçlarının Giriş Tarihleri",
          start: "27 Ocak 2025",
          end: "04 Şubat 2025"
        }
      ]
    },
    spring: {
      title: "BAHAR DÖNEMİ",
      events: [
        {
          title: "Katkı Payı Öğrenim Ücretinin 1 nci ve 2 nci Taksitinin Ödenmesi",
          start: "27 Ocak 2025",
          end: "7 Şubat 2025"
        },
        {
          title: "Ders Kaydı",
          start: "3 Şubat 2025",
          end: "7 Şubat 2025"
        },
        {
          title: "Danışman Onayı",
          start: "3 Şubat 2025",
          end: "9 Şubat 2025"
        },
        {
          title: "Derslerin Başlama/Bitiş Tarihleri",
          start: "10 Şubat 2025",
          end: "16 Mayıs 2025"
        },
        {
          title: "Ders Ekleme,Silme, Mazeretli Ders Kaydı Baş.ve Ders Kayıt Tarihleri",
          start: "17 Şubat 2025",
          end: "21 Şubat 2025"
        },
        {
          title: "Ara Sınavlar",
          start: "5 Nisan 2025",
          end: "13 Nisan 2025"
        },
        {
          title: "Ara Sınav Not Giriş Tarihleri",
          start: "5 Nisan 2025",
          end: "16 Mayıs 2025"
        },
        {
          title: "Yarıyıl Sonu Sınav Tarihleri",
          start: "20 Mayıs 2025",
          end: "04 Haziran 2025"
        },
        {
          title: "Yarıyıl Sonu Sınav Sonuçlarının Giriş Tarihleri",
          start: "20 Mayıs 2025",
          end: "13 Haziran 2025"
        },
        {
          title: "Bütünleme Sınavları",
          start: "16 Haziran 2025",
          end: "22 Haziran 2025"
        },
        {
          title: "Bütünleme Sınav Sonuçlarının Giriş Tarihleri",
          start: "16 Haziran 2025",
          end: "22 Haziran 2025"
        }
      ]
    },
    additional: [
      {
        title: "Mezuniyet Tek Ders Sınavı",
        dates: [
          { date: "07 Şubat 2025" },
          { date: "27 Haziran 2025" }
        ]
      },
      {
        title: "Sınav Sonuçlarının Son Teslim Tarihi",
        dates: [
          { date: "14 Şubat 2025" },
          { date: "11 Temmuz 2025" }
        ]
      },
      {
        title: "Ek Sınav Tarihleri (Azami Öğrenim Süresini Dolduran Öğrenciler İçin)",
        date: "1-12 Eylül 2025",
        additionalInfo: "(Sın.mtür.tar. 18-22 Ağustos 2025)"
      }
    ]
  };

  return (
    <main className="min-h-screen bg-theme-bg">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[30vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/akademik-takvim.jpg"
            alt="Akademik Takvim"
            className="object-cover w-full h-full"
            width={1920}
            height={1080}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-theme-primary to-theme-primary-hover opacity-90" />
        </div>
        <div className="relative text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-theme-bg">
            2024-2025 Akademik Takvimi
          </h1>
          <p className="text-xl text-theme-bg/90">
            Önlisans ve Lisans Eğitim-Öğretim Yılı
          </p>
        </div>
      </section>

      {/* Takvim İçeriği */}
      <section className="py-16 bg-theme-bg">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="prep" className="space-y-8">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 gap-4">
              <TabsTrigger value="prep">Hazırlık Sınavları</TabsTrigger>
              <TabsTrigger value="exams">Muafiyet Sınavları</TabsTrigger>
              <TabsTrigger value="fall">Güz Dönemi</TabsTrigger>
              <TabsTrigger value="spring">Bahar Dönemi</TabsTrigger>
            </TabsList>

            {/* Hazırlık Sınavları */}
            <TabsContent value="prep">
              <Card>
                <CardHeader>
                  <CardTitle>Hazırlık ve Yeterlilik Sınavları</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {calendar.preparatory.map((item, index) => (
                    <div key={index} className="border-b border-theme-primary/10 last:border-0 pb-4 last:pb-0">
                      <h3 className="font-medium text-lg text-theme-text">{item.title}</h3>
                      {item.subtitle && (
                        <p className="text-theme-text-muted text-sm mt-1">{item.subtitle}</p>
                      )}
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-theme-primary">{item.date}</span>
                        {item.additionalInfo && (
                          <span className="text-theme-text-muted">({item.additionalInfo})</span>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Muafiyet Sınavları */}
            <TabsContent value="exams">
              <Card>
                <CardHeader>
                  <CardTitle>Muafiyet Sınavları</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {calendar.exams.map((item, index) => (
                    <div key={index} className="border-b border-theme-primary/10 last:border-0 pb-4 last:pb-0">
                      <h3 className="font-medium text-lg text-theme-text">{item.title}</h3>
                      {item.subtitle && (
                        <p className="text-theme-text-muted text-sm mt-1">{item.subtitle}</p>
                      )}
                      <div className="mt-2">
                        <span className="text-theme-primary">{item.date}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Güz Dönemi */}
            <TabsContent value="fall">
              <Card>
                <CardHeader>
                  <CardTitle>{calendar.fall.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {calendar.fall.events.map((event, index) => (
                      <div key={index} className="border-b border-theme-primary/10 last:border-0 pb-4 last:pb-0">
                        <h3 className="font-medium text-lg text-theme-text">{event.title}</h3>
                        <div className="mt-2 flex items-center gap-2 text-theme-primary">
                          <span>{event.start}</span>
                          <span>-</span>
                          <span>{event.end}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Bahar Dönemi */}
            <TabsContent value="spring">
              <Card>
                <CardHeader>
                  <CardTitle>{calendar.spring.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {calendar.spring.events.map((event, index) => (
                      <div key={index} className="border-b border-theme-primary/10 last:border-0 pb-4 last:pb-0">
                        <h3 className="font-medium text-lg text-theme-text">{event.title}</h3>
                        <div className="mt-2 flex items-center gap-2 text-theme-primary">
                          <span>{event.start}</span>
                          <span>-</span>
                          <span>{event.end}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Ek Bilgiler */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Ek Sınavlar ve Önemli Tarihler</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {calendar.additional.map((item, index) => (
                  <div key={index} className="border-b border-theme-primary/10 last:border-0 pb-4 last:pb-0">
                    <h3 className="font-medium text-lg text-theme-text">{item.title}</h3>
                    {item.dates ? (
                      <div className="mt-2 space-y-2">
                        {item.dates.map((date, idx) => (
                          <div key={idx} className="text-theme-primary">
                            {date.date}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="mt-2">
                        <span className="text-theme-primary">{item.date}</span>
                        {item.additionalInfo && (
                          <span className="text-theme-text-muted ml-2">{item.additionalInfo}</span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
} 