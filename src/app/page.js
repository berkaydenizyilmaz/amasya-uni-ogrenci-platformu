import Header from "@/components/header";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

/**
 * Ana sayfa bileşeni
 * @returns {JSX.Element} Ana sayfa
 */
export default function Home() {
  return (
    <main className="min-h-screen bg-theme-bg">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-theme-primary to-theme-primary-hover opacity-90" />
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="container relative mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-theme-bg">
            Amasya Üniversitesi Öğrenci Platformu
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-theme-bg/90">
            Öğrenci hayatınızı kolaylaştıran dijital çözümler
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/universite/genel-bilgi">
              <Button size="lg" variant="default" className="bg-theme-bg text-theme-primary hover:bg-theme-bg/90">
                Üniversitemizi Keşfet
              </Button>
            </Link>
            <Link href="/not-paylasimi">
              <Button size="lg" variant="outline" className="text-theme-bg border-theme-bg hover:bg-theme-bg/10">
                Not Paylaşımına Başla
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Öne Çıkan Özellikler */}
      <section className="py-24 bg-theme-bg">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-theme-text">
            Öne Çıkan Özellikler
          </h2>
          <p className="text-theme-text-muted text-center mb-12 max-w-2xl mx-auto">
            Üniversite hayatınızı kolaylaştıracak tüm araçlar tek bir platformda
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-lg transition-all border-theme-primary/20 bg-theme-bg hover:border-theme-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-theme-text">
                  <svg
                    className="h-6 w-6 text-theme-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  Üniversite Bilgileri
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-theme-text-muted">Kampüs, fakülte ve bölümler hakkında detaylı bilgiler</p>
              </CardContent>
              <CardFooter>
                <Link href="/universite/genel-bilgi" className="w-full">
                  <Button variant="outline" className="w-full group-hover:bg-theme-primary group-hover:text-theme-bg border-theme-primary text-theme-primary transition-colors">
                    Detaylı Bilgi
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="group hover:shadow-lg transition-all border-theme-primary/20 bg-theme-bg hover:border-theme-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-theme-text">
                  <svg
                    className="h-6 w-6 text-theme-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Not Paylaşımı
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-theme-text-muted">Ders notlarını paylaş, arkadaşlarınla işbirliği yap</p>
              </CardContent>
              <CardFooter>
                <Link href="/not-paylasimi" className="w-full">
                  <Button variant="outline" className="w-full group-hover:bg-theme-primary group-hover:text-theme-bg border-theme-primary text-theme-primary transition-colors">
                    Notlara Göz At
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="group hover:shadow-lg transition-all border-theme-primary/20 bg-theme-bg hover:border-theme-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-theme-text">
                  <svg
                    className="h-6 w-6 text-theme-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Etkinlikler
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-theme-text-muted">Kampüsteki etkinlikleri takip et, katılım sağla</p>
              </CardContent>
              <CardFooter>
                <Link href="/etkinlikler" className="w-full">
                  <Button variant="outline" className="w-full group-hover:bg-theme-primary group-hover:text-theme-bg border-theme-primary text-theme-primary transition-colors">
                    Etkinlikleri Gör
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Üniversite Hakkında */}
      <section className="py-24 bg-theme-bg">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-theme-text">
                Amasya Üniversitesi Hakkında
              </h2>
              <p className="text-theme-text-muted mb-4">
                Amasya Üniversitesi, 2006 yılında kurulmuş olup, köklü geçmişi ve modern eğitim anlayışıyla öğrencilerine kaliteli eğitim sunmaktadır.
              </p>
              <p className="text-theme-text-muted mb-6">
                11 Fakülte, 3 Enstitü, 1 Yüksekokul ve 7 Meslek Yüksekokulu ile geniş bir akademik yapıya sahiptir.
              </p>
              <div className="flex gap-4">
                <Link href="/universite/genel-bilgi">
                  <Button size="lg" className="bg-theme-primary text-theme-bg hover:bg-theme-primary-hover">
                    Daha Fazla Bilgi
                  </Button>
                </Link>
                <Link href="/universite/fakulteler">
                  <Button size="lg" variant="outline" className="text-theme-primary border-theme-primary hover:bg-theme-primary hover:text-theme-bg">
                    Fakülteleri İncele
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/university.jpg"
                alt="Amasya Üniversitesi"
                className="object-cover w-full h-full"
                width={1000}
                height={1000}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-theme-bg to-transparent" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
