'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Header from "@/components/header";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { t } from "@/lib/i18n";
import L from 'leaflet';

// Haritayı client-side'da yükle
const Map = dynamic(() => import("@/components/map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
      <div className="text-gray-500">Harita yükleniyor...</div>
    </div>
  ),
});

/**
 * Otobüs güzergahları
 */
const routes = {
  "4": {
    name: "4 YÜKSEK OKUL",
    stops: [
      { name: "Şehir Merkezi", location: [40.64961638380662, 35.79509470498191] },
      { name: "İpekköy", location: [40.661633893026355, 35.84740413988185] }
    ],
    path: [
      [40.64961638380662, 35.79509470498191],
      [40.661633893026355, 35.84740413988185]
    ],
    schedule: [
      "06:30", "07:00", "07:30", "08:00", "08:30",
      "09:00", "09:30", "10:00", "10:30", "11:00",
      "11:30", "12:00", "12:30", "13:00", "13:30",
      "14:00", "14:30", "15:00", "15:30", "16:00",
      "16:30", "17:00", "17:30", "18:00", "18:30",
      "19:00", "19:30", "20:00"
    ]
  },
  "6": {
    name: "6 ÜNİVERSİTE",
    stops: [
      { name: "Şehir Merkezi", location: [40.64931985520128, 35.79082677184058] },
      { name: "Üniversite", location: [40.606991030149224, 35.81216914460894] }
    ],
    path: [
      [40.64931985520128, 35.79082677184058],
      [40.606991030149224, 35.81216914460894]
    ],
    schedule: [
      "07:00", "07:30", "08:00", "08:30", "09:00",
      "09:30", "10:00", "10:30", "11:00", "11:30",
      "12:00", "12:30", "13:00", "13:30", "14:00",
      "14:30", "15:00", "15:30", "16:00", "16:30",
      "17:00", "17:30", "18:00"
    ]
  }
};

/**
 * Otobüs güzergahları sayfası
 * @returns {JSX.Element} Otobüs güzergahları sayfası
 */
export default function BusRoutesPage() {
  const [selectedRoute, setSelectedRoute] = useState("4");
  const [mapKey, setMapKey] = useState(0); // Her sekme değişiminde haritayı yeniden yüklemek için

  const handleRouteChange = (value) => {
    setSelectedRoute(value);
    setMapKey(prev => prev + 1); // Haritayı yeniden yükle
  };

  return (
    <main className="min-h-screen bg-theme-bg">
      <Header />
      
      <div className="container mx-auto p-4 space-y-4">
        <h1 className="text-2xl font-bold">Otobüs Güzergahları</h1>
        
        <Tabs defaultValue="4" onValueChange={handleRouteChange}>
          <TabsList>
            <TabsTrigger value="4">4 Numaralı Hat</TabsTrigger>
            <TabsTrigger value="6">6 Numaralı Hat</TabsTrigger>
          </TabsList>
          
          <TabsContent value="4">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">{routes['4'].name}</h2>
              <div className="h-[500px]">
                <Map key={mapKey} route={routes['4']} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4">
                  <h3 className="font-semibold mb-2">Duraklar:</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {routes['4'].stops.map((stop, index) => (
                      <li key={index}>{stop.name}</li>
                    ))}
                  </ul>
                </Card>
                <Card className="p-4">
                  <h3 className="font-semibold mb-2">Sefer Saatleri:</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {routes['4'].schedule.map((time, index) => (
                      <div key={index} className="text-sm">{time}</div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">{routes['6'].name}</h2>
              <div className="h-[500px]">
                <Map key={mapKey} route={routes['6']} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4">
                  <h3 className="font-semibold mb-2">Duraklar:</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {routes['6'].stops.map((stop, index) => (
                      <li key={index}>{stop.name}</li>
                    ))}
                  </ul>
                </Card>
                <Card className="p-4">
                  <h3 className="font-semibold mb-2">Sefer Saatleri:</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {routes['6'].schedule.map((time, index) => (
                      <div key={index} className="text-sm">{time}</div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
} 