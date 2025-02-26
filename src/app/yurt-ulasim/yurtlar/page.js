'use client';

import { useEffect, useState } from "react";
import Header from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { MapPin, Users, Phone, Building } from "lucide-react";
import { t } from "@/lib/i18n";

/**
 * KYK Yurtları sayfası
 * @returns {JSX.Element} KYK Yurtları sayfası
 */
export default function Dormitories() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const dormitories = {
    male: [
      {
        name: "SULTAN BAYEZİD YURDU",
        type: t('dormitories.types.male'),
        capacity: 1390,
        occupancy: 1385,
        address: "KOZA MAH.ŞEHİT ALİ BİLGİÇ CAD.CİHANGİR SK.NO:79/1 MERKEZ / AMASYA",
        image: "/yurtlar/sultan-bayezid-yurdu-1.jpg",
        location: "Merkez"
      },
      {
        name: "AMASYA YURDU",
        type: t('dormitories.types.male'),
        capacity: 266,
        occupancy: 266,
        address: "AKBİLEK MAH.KANDİL SK.NO:4 MERKEZ / AMASYA",
        image: "/yurtlar/amasya-yurdu.jpg",
        location: "Merkez"
      },
      {
        name: "KARA MUSTAFA PAŞA YURDU",
        type: t('dormitories.types.male'),
        capacity: 420,
        occupancy: 292,
        address: "YUNUS EMRE MAH.FAKÜLTE SK.NO:2 MERZİFON / AMASYA",
        image: "/yurtlar/kyk-kara-mustafa-pasa-ogrenci-yurdu-42-1.jpg",
        location: "Merzifon"
      },
      {
        name: "GÜMÜŞHACIKÖY YURDU",
        type: t('dormitories.types.male'),
        capacity: 150,
        occupancy: 39,
        address: "ARTIKABAT MAH.CUMHURİYET CAD. NO:116 GÜMÜŞHACIKÖY / AMASYA",
        image: "/yurtlar/gumushacikoy.jpeg",
        location: "Gümüşhacıköy"
      }
    ],
    female: [
      {
        name: "AMASYA YEŞİLIRMAK YURDU",
        type: t('dormitories.types.female'),
        capacity: 3110,
        occupancy: 2777,
        address: "ŞEYHCUİ MAH.FIRAT YILMAZ ÇAKIROĞLU CAD.NO:74 MERKEZ / AMASYA",
        image: "/yurtlar/amasya-yesilirmak-yurdu-1.jpg",
        location: "Merkez"
      },
      {
        name: "HÜSNÜŞAH HATUN YURDU",
        type: t('dormitories.types.female'),
        capacity: 1065,
        occupancy: 1045,
        address: "ŞEYHCUİ MAH.GÖKHAN SK.NO:11 MERKEZ / AMASYA",
        image: "/yurtlar/husnusah-hatun-yurdu-2.jpg",
        location: "Merkez"
      },
      {
        name: "MERZİFON YURDU",
        type: t('dormitories.types.female'),
        capacity: 310,
        occupancy: 310,
        address: "CAMİCEDİT MAH.ATATÜRK BULV.NO:1 MERZİFON / AMASYA",
        image: "/yurtlar/merzifon-yurdu-1.jpg",
        location: "Merzifon"
      },
      {
        name: "SULUOVA YURDU",
        type: t('dormitories.types.female'),
        capacity: 75,
        occupancy: 75,
        address: "YENİ MAH.GİZLİ SK.NO:11 SULUOVA / AMASYA",
        image: "/yurtlar/suluova.jpg",
        location: "Suluova"
      }
    ]
  };

  return (
    <main className="min-h-screen bg-theme-bg">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/yurtlar/merzifon-yurdu-1.jpg"
            alt={t('dormitories.title')}
            className="object-cover w-full h-full brightness-[0.4]"
            width={1920}
            height={1080}
            priority
          />
        </div>
        <div className="relative text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            {t('dormitories.title')}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            {t('dormitories.subtitle')}
          </p>
        </div>
      </section>

      {/* Yurtlar Listesi */}
      <section className="py-16 bg-theme-bg">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="all" className="space-y-8">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 gap-4">
              <TabsTrigger value="all">{t('dormitories.tabs.all')}</TabsTrigger>
              <TabsTrigger value="male">{t('dormitories.tabs.male')}</TabsTrigger>
              <TabsTrigger value="female">{t('dormitories.tabs.female')}</TabsTrigger>
            </TabsList>

            {/* Tüm Yurtlar */}
            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...dormitories.male, ...dormitories.female].map((dorm, index) => (
                  <DormitoryCard key={index} dorm={dorm} />
                ))}
              </div>
            </TabsContent>

            {/* Erkek Yurtları */}
            <TabsContent value="male">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dormitories.male.map((dorm, index) => (
                  <DormitoryCard key={index} dorm={dorm} />
                ))}
              </div>
            </TabsContent>

            {/* Kız Yurtları */}
            <TabsContent value="female">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dormitories.female.map((dorm, index) => (
                  <DormitoryCard key={index} dorm={dorm} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  );
}

function DormitoryCard({ dorm }) {
  const occupancyRate = Math.round((dorm.occupancy / dorm.capacity) * 100);
  const occupancyColor = 
    occupancyRate >= 95 ? "bg-red-500" :
    occupancyRate >= 80 ? "bg-yellow-500" :
    "bg-green-500";

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all">
      <div className="relative h-48">
        <Image
          src={dorm.image}
          alt={dorm.name}
          className="object-cover"
          fill
        />
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className={`${dorm.type === t('dormitories.types.male') ? 'bg-blue-500' : 'bg-pink-500'} text-white`}>
            {dorm.type}
          </Badge>
        </div>
      </div>
      <CardHeader>
        <CardTitle className="flex items-start justify-between gap-4">
          <span className="text-xl">{dorm.name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-theme-text-muted">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{dorm.location}</span>
        </div>
        <div className="flex items-center gap-2 text-theme-text-muted">
          <Users className="w-4 h-4" />
          <span className="text-sm">{t('dormitories.info.capacity')}: {dorm.capacity}</span>
          <div className={`ml-2 px-2 py-0.5 rounded text-white text-xs ${occupancyColor}`}>
            {occupancyRate}{t('dormitories.occupancyStatus.full')}
          </div>
        </div>
        <p className="text-sm text-theme-text-muted border-t border-theme-primary/10 pt-4">
          {dorm.address}
        </p>
      </CardContent>
    </Card>
  );
} 