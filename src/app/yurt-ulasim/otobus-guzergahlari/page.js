'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Header from "@/components/header";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bus, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import { t } from "@/lib/i18n";

// Haritayı client-side'da yükle
const Map = dynamic(() => import("@/components/map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[500px] bg-theme-bg/5 rounded-lg flex items-center justify-center">
      <div className="text-theme-text-muted">{t('busRoutes.map.loading')}</div>
    </div>
  ),
});

/**
 * Otobüs güzergahları
 */
const routes = {
  "4": {
    name: t('busRoutes.routes.4.name'),
    stops: [
      { name: t('busRoutes.routes.4.stops.center'), location: [40.64961638380662, 35.79509470498191] },
      { name: t('busRoutes.routes.4.stops.ipekkoy'), location: [40.661633893026355, 35.84740413988185] }
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
    name: t('busRoutes.routes.6.name'),
    stops: [
      { name: t('busRoutes.routes.6.stops.center'), location: [40.64931985520128, 35.79082677184058] },
      { name: t('busRoutes.routes.6.stops.university'), location: [40.606991030149224, 35.81216914460894] }
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
      <section className="relative py-8 bg-theme-bg border-b border-theme-primary/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 text-left">
              <h1 className="text-2xl md:text-3xl font-bold mb-2 text-theme-text bg-clip-text text-transparent bg-gradient-to-r from-theme-primary to-theme-primary-hover">
                {t('busRoutes.hero.title')}
              </h1>
              <p className="text-sm md:text-base text-theme-text-muted max-w-2xl">
                {t('busRoutes.hero.subtitle')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* İçerik */}
      <section className="py-8">
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
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <Bus className="h-5 w-5 text-theme-primary" />
                      {route.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-theme-primary" />
                          {t('busRoutes.stops')}
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            <span className="text-sm">{route.stops[0].name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500" />
                            <span className="text-sm">{route.stops[route.stops.length - 1].name}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <Clock className="h-4 w-4 text-theme-primary" />
                          {t('busRoutes.schedule')}
                        </h4>
                        <div className="grid grid-cols-4 gap-2">
                          {route.schedule.map((time, index) => (
                            <div 
                              key={index} 
                              className="text-sm bg-theme-primary/5 rounded px-2 py-1 text-center"
                            >
                              {time}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Harita */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden border-theme-primary">
                <CardHeader className="border-b border-theme-primary/10">
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-theme-primary" />
                    {t('busRoutes.map.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {isMounted && (
                    <Map route={routes[selectedRoute]} />
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 