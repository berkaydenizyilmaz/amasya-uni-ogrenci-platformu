'use client';

import { useState, useEffect } from "react";
import Header from "@/components/header";
import Chatbot from "@/components/chatbot";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { t } from "@/lib/i18n";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

/**
 * Tarihi yerler sayfası
 * @returns {JSX.Element} Tarihi yerler sayfası
 */
export default function HistoricalPlacesPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Sayfa yüklendiğinde loading durumunu kaldır
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const historicalPlaces = [
    {
      id: 1,
      title: t('historicalPlaces.places.pontusRoyalTombs.title'),
      period: t('historicalPlaces.places.pontusRoyalTombs.period'),
      description: t('historicalPlaces.places.pontusRoyalTombs.description'),
      images: [
        "/tarihi-yerler/pontus1.jpg",
        "/tarihi-yerler/pontus2.jpg",
        "/tarihi-yerler/pontus3.jpg"
      ],
      highlights: t('historicalPlaces.places.pontusRoyalTombs.highlights')
    },
    {
      id: 2,
      title: t('historicalPlaces.places.amasyaCastle.title'),
      period: t('historicalPlaces.places.amasyaCastle.period'),
      description: t('historicalPlaces.places.amasyaCastle.description'),
      images: [
        "/tarihi-yerler/kale1.jpg",
        "/tarihi-yerler/kale2.jpg"
      ],
      highlights: t('historicalPlaces.places.amasyaCastle.highlights')
    },
    {
      id: 3,
      title: t('historicalPlaces.places.bayezidComplex.title'),
      period: t('historicalPlaces.places.bayezidComplex.period'),
      description: t('historicalPlaces.places.bayezidComplex.description'),
      images: [
        "/tarihi-yerler/bayezid1.jpg",
        "/tarihi-yerler/bayezid2.jpg"
      ],
      highlights: t('historicalPlaces.places.bayezidComplex.highlights')
    },
    {
      id: 4,
      title: t('historicalPlaces.places.hazeranlarMansion.title'),
      period: t('historicalPlaces.places.hazeranlarMansion.period'),
      description: t('historicalPlaces.places.hazeranlarMansion.description'),
      images: [
        "/tarihi-yerler/konak1.jpg",
        "/tarihi-yerler/konak2.jpg"
      ],
      highlights: t('historicalPlaces.places.hazeranlarMansion.highlights')
    },
    {
      id: 5,
      title: t('historicalPlaces.places.ferhatSirinWaterways.title'),
      period: t('historicalPlaces.places.ferhatSirinWaterways.period'),
      description: t('historicalPlaces.places.ferhatSirinWaterways.description'),
      images: [
        "/tarihi-yerler/ferhatsirin1.jpg",
        "/tarihi-yerler/ferhatsirin2.jpg",
        "/tarihi-yerler/ferhatsirin3.jpg"
      ],
      highlights: t('historicalPlaces.places.ferhatSirinWaterways.highlights')
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-theme-bg flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-32 h-32 bg-theme-primary/20 rounded-full mb-4"></div>
          <div className="h-4 w-48 bg-theme-primary/20 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-theme-bg">
      <Header />
      
      {/* Hero Section */}
      <div className="relative h-[50vh] mb-16">
        <Image
          src="/tarihi-yerler/pontus1.jpg"
          alt={t('historicalPlaces.title')}
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-center">
            {t('historicalPlaces.title')}
          </h1>
          <p className="text-xl md:text-2xl text-center max-w-2xl px-4">
            {t('historicalPlaces.subtitle')}
          </p>
        </div>
      </div>

      {/* İçerik */}
      <div className="container mx-auto px-4 pb-16">
        <div className="space-y-24">
          {historicalPlaces.map((place, index) => (
            <div 
              key={place.id} 
              className="opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s`, animationFillMode: 'forwards' }}
            >
              <div className={`bg-white rounded-2xl shadow-2xl overflow-hidden ${index % 2 === 0 ? '' : 'md:flex-row-reverse'} md:flex transform transition-transform duration-500 hover:scale-[1.02]`}>
                {/* Görsel Slider */}
                <div className="md:w-1/2 relative h-[500px]">
                  <Swiper
                    modules={[Navigation, Pagination, Autoplay, EffectFade]}
                    effect="fade"
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 5000 }}
                    loop={true}
                    className="h-full group"
                  >
                    {place.images.map((image, i) => (
                      <SwiperSlide key={i}>
                        <Image
                          src={image}
                          alt={`${place.title} - ${i + 1}`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          priority={index === 0}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <div className="absolute top-4 left-4 z-10 bg-theme-primary/90 text-white px-4 py-2 rounded-full text-sm">
                    {place.period}
                  </div>
                </div>

                {/* İçerik */}
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                  <h2 className="text-3xl font-bold mb-6 text-theme-primary">
                    {place.title}
                  </h2>
                  <p className="text-theme-text whitespace-pre-line mb-8 leading-relaxed">
                    {place.description}
                  </p>
                  
                  {/* Öne Çıkan Özellikler */}
                  {place.highlights && (
                    <div className="grid grid-cols-2 gap-4">
                      {place.highlights.map((highlight, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-theme-primary rounded-full"></div>
                          <span className="text-sm text-theme-text">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Chatbot />
    </main>
  );
} 