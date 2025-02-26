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
      <section className="relative py-8 bg-theme-bg border-b border-theme-primary/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 text-left">
              <h1 className="text-2xl md:text-3xl font-bold mb-2 text-theme-text bg-clip-text text-transparent bg-gradient-to-r from-theme-primary to-theme-primary-hover">
                {t('university.academicCalendar.title')}
              </h1>
              <p className="text-sm md:text-base text-theme-text-muted max-w-2xl">
                {t('university.academicCalendar.subtitle')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Takvim İçeriği */}
      <section className="py-16 bg-theme-bg">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="prep" className="space-y-8">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 gap-4">
              <TabsTrigger value="prep">{t('university.academicCalendar.tabs.prep')}</TabsTrigger>
              <TabsTrigger value="exams">{t('university.academicCalendar.tabs.exams')}</TabsTrigger>
              <TabsTrigger value="fall">{t('university.academicCalendar.tabs.fall')}</TabsTrigger>
              <TabsTrigger value="spring">{t('university.academicCalendar.tabs.spring')}</TabsTrigger>
            </TabsList>

            {/* Hazırlık Sınavları */}
            <TabsContent value="prep">
              <Card>
                <CardHeader>
                  <CardTitle>{t('university.academicCalendar.sections.prep.title')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {calendar.preparatory.map((item, index) => (
                    <div key={index} className="border-b border-theme-primary/10 last:border-0 pb-4 last:pb-0">
                      <h3 className="font-medium text-lg text-theme-text">
                        {t('university.academicCalendar.sections.prep.items.proficiencyExam.title')}
                      </h3>
                      {item.subtitle && (
                        <p className="text-theme-text-muted text-sm mt-1">
                          {t('university.academicCalendar.sections.prep.items.proficiencyExam.subtitle')}
                        </p>
                      )}
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-theme-primary">{item.date}</span>
                        {item.additionalInfo && (
                          <span className="text-theme-text-muted">({t('university.academicCalendar.sections.prep.items.proficiencyExam.resultDate')})</span>
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
                  <CardTitle>{t('university.academicCalendar.sections.exams.title')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {calendar.exams.map((item, index) => (
                    <div key={index} className="border-b border-theme-primary/10 last:border-0 pb-4 last:pb-0">
                      <h3 className="font-medium text-lg text-theme-text">
                        {t(`university.academicCalendar.sections.exams.items.${index === 0 ? 'languageExemption' : index === 1 ? 'computerExemption' : 'turkishProficiency'}.title`)}
                      </h3>
                      {item.subtitle && (
                        <p className="text-theme-text-muted text-sm mt-1">
                          {t(`university.academicCalendar.sections.exams.items.${index === 0 ? 'languageExemption' : 'computerExemption'}.subtitle`)}
                        </p>
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
                  <CardTitle>{t('university.academicCalendar.sections.fall.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {calendar.fall.events.map((event, index) => (
                      <div key={index} className="border-b border-theme-primary/10 last:border-0 pb-4 last:pb-0">
                        <h3 className="font-medium text-lg text-theme-text">
                          {t(`university.academicCalendar.sections.fall.events.${
                            index === 0 ? 'tuitionPayment' :
                            index === 1 ? 'courseRegistration' :
                            index === 2 ? 'advisorApproval' :
                            index === 3 ? 'courseDates' :
                            index === 4 ? 'addDrop' :
                            index === 5 ? 'midterms' :
                            index === 6 ? 'midtermGrades' :
                            index === 7 ? 'finals' :
                            index === 8 ? 'finalGrades' :
                            index === 9 ? 'makeupExams' : 'makeupGrades'
                          }`)}
                        </h3>
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
                  <CardTitle>{t('university.academicCalendar.sections.spring.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {calendar.spring.events.map((event, index) => (
                      <div key={index} className="border-b border-theme-primary/10 last:border-0 pb-4 last:pb-0">
                        <h3 className="font-medium text-lg text-theme-text">
                          {t(`university.academicCalendar.sections.spring.events.${
                            index === 0 ? 'tuitionPayment' :
                            index === 1 ? 'courseRegistration' :
                            index === 2 ? 'advisorApproval' :
                            index === 3 ? 'courseDates' :
                            index === 4 ? 'addDrop' :
                            index === 5 ? 'midterms' :
                            index === 6 ? 'midtermGrades' :
                            index === 7 ? 'finals' :
                            index === 8 ? 'finalGrades' :
                            index === 9 ? 'makeupExams' : 'makeupGrades'
                          }`)}
                        </h3>
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
              <CardTitle>{t('university.academicCalendar.sections.additional.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {calendar.additional.map((item, index) => (
                  <div key={index} className="border-b border-theme-primary/10 last:border-0 pb-4 last:pb-0">
                    <h3 className="font-medium text-lg text-theme-text">
                      {t(`university.academicCalendar.sections.additional.items.${
                        index === 0 ? 'singleCourse' :
                        index === 1 ? 'finalSubmission' : 'additionalExams'
                      }.title`)}
                    </h3>
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
                          <span className="text-theme-text-muted ml-2">
                            {t('university.academicCalendar.sections.additional.items.additionalExams.info')}
                          </span>
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