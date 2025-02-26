'use client';

import { useState } from 'react';
import Header from "@/components/header";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { t } from "@/lib/i18n";
import GoogleMaps from "@/components/google-maps";

/**
 * Otobüs güzergahları
 */
const routes = {
  "4": {
    name: "4 YÜKSEK OKUL",
    stops: [
      { lat: 40.6550, lng: 35.8330, name: "YÜKSEK OKUL" },
      { lat: 40.6540, lng: 35.8320, name: "MEYDAN" },
      { lat: 40.6530, lng: 35.8310, name: "İHSANİYE" },
      { lat: 40.6520, lng: 35.8300, name: "HASTANE" },
      { lat: 40.6510, lng: 35.8290, name: "İSTASYON" }
    ],
    color: "#FF0000", // Kırmızı rota
    schedule: [
      "07:00", "07:30", "08:00", "08:30", "09:00",
      "16:00", "16:30", "17:00", "17:30", "18:00"
    ]
  },
  "6": {
    name: "6 FEN EDEBİYAT",
    stops: [
      { lat: 40.6560, lng: 35.8340, name: "YÜKSEK OKUL HACILAR MEYDANI" },
      { lat: 40.6570, lng: 35.8350, name: "FEN EDEBİYAT FAKÜLTESİ" }
    ],
    color: "#0000FF", // Mavi rota
    schedule: [
      "07:15", "07:45", "08:15", "08:45", "09:15",
      "16:15", "16:45", "17:15", "17:45", "18:15"
    ]
  }
};

/**
 * Otobüs güzergahları sayfası
 * @returns {JSX.Element} Otobüs güzergahları sayfası
 */
export default function BusRoutesPage() {
  const [selectedRoute, setSelectedRoute] = useState("4");
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [polyline, setPolyline] = useState(null);

  // Harita yüklendiğinde
  const onMapLoad = (map) => {
    setMap(map);
    // İlk rotayı çiz
    drawRoute("4", map);
  };

  // Rota çizme fonksiyonu
  const drawRoute = (routeId, map) => {
    // Önceki işaretçileri temizle
    markers.forEach(marker => marker.setMap(null));
    if (polyline) polyline.setMap(null);

    const route = routes[routeId];
    const newMarkers = [];
    const path = route.stops.map(stop => {
      // Durak işaretçisi ekle
      const marker = new window.google.maps.Marker({
        position: { lat: stop.lat, lng: stop.lng },
        map: map,
        title: stop.name
      });
      newMarkers.push(marker);
      return { lat: stop.lat, lng: stop.lng };
    });

    // Rota çizgisi
    const newPolyline = new window.google.maps.Polyline({
      path: path,
      geodesic: true,
      strokeColor: route.color,
      strokeOpacity: 1.0,
      strokeWeight: 3
    });

    newPolyline.setMap(map);
    setMarkers(newMarkers);
    setPolyline(newPolyline);

    // Haritayı rotaya sığdır
    const bounds = new window.google.maps.LatLngBounds();
    path.forEach(point => bounds.extend(point));
    map.fitBounds(bounds);
  };

  // Tab değiştiğinde rotayı güncelle
  const handleRouteChange = (routeId) => {
    setSelectedRoute(routeId);
    if (map) {
      drawRoute(routeId, map);
    }
  };

  return (
    <main className="min-h-screen bg-theme-bg">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <div className="w-full h-full bg-theme-primary opacity-90" />
        </div>
        <div className="relative text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            Otobüs Güzergahları
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Kampüs otobüs hatları ve durakları
          </p>
        </div>
      </section>

      <div className="container mx-auto py-16 px-4">
        <Tabs defaultValue="4" className="space-y-8" onValueChange={handleRouteChange}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="4">4 YÜKSEK OKUL</TabsTrigger>
            <TabsTrigger value="6">6 FEN EDEBİYAT</TabsTrigger>
          </TabsList>

          {Object.entries(routes).map(([id, route]) => (
            <TabsContent key={id} value={id} className="space-y-8">
              {/* Harita */}
              <Card className="p-0 overflow-hidden h-[500px] relative">
                <GoogleMaps onMapLoad={onMapLoad} />
              </Card>

              {/* Güzergah Bilgileri */}
              <Card className="p-6">
                <h3 className="text-2xl font-bold mb-4">{route.name}</h3>
                
                {/* Duraklar */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-3">Duraklar</h4>
                  <div className="space-y-2">
                    {route.stops.map((stop, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-theme-primary rounded-full" />
                        <span>{stop.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sefer Saatleri */}
                <div>
                  <h4 className="text-lg font-semibold mb-3">Sefer Saatleri</h4>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    {route.schedule.map((time, index) => (
                      <div key={index} className="bg-theme-primary/10 rounded-md p-2 text-center">
                        {time}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </main>
  );
} 