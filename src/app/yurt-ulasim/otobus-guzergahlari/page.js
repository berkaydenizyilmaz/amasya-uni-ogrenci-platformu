'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Header from "@/components/header";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Haritayı client-side'da yükle
const Map = dynamic(() => import("@/components/map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[500px] bg-gray-100 rounded-lg flex items-center justify-center">
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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleRouteChange = (value) => {
    setSelectedRoute(value);
  };

  return (
    <main className="min-h-screen bg-theme-bg">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-theme-primary to-theme-primary-hover opacity-90" />
        </div>
        <div className="relative text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-theme-bg">
            Otobüs Güzergahları
          </h1>
          <p className="text-xl md:text-2xl text-theme-bg/90 max-w-3xl mx-auto">
            Kampüs ulaşım hatları ve sefer saatleri
          </p>
        </div>
      </section>

      {/* İçerik */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Güzergah Listesi */}
            <div className="lg:col-span-1 space-y-4">
              {Object.entries(routes).map(([id, route]) => (
                <Card 
                  key={id} 
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedRoute === id 
                      ? 'border-theme-primary bg-theme-primary/5' 
                      : 'border-theme-primary/20 hover:border-theme-primary'
                  }`}
                  onClick={() => handleRouteChange(id)}
                >
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-4">{route.name}</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Duraklar:</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            <span>{route.stops[0].name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500" />
                            <span>{route.stops[route.stops.length - 1].name}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Sefer Saatleri:</h4>
                        <div className="grid grid-cols-4 gap-2">
                          {route.schedule.map((time, index) => (
                            <div key={index} className="text-sm">{time}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Harita */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden">
                {isMounted && (
                  <Map route={routes[selectedRoute]} />
                )}
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 