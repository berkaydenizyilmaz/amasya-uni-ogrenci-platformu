'use client';

import { useEffect, useState } from "react";
import Header from "@/components/header";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { t } from "@/lib/i18n";

/**
 * Ana sayfa bileşeni
 * @returns {JSX.Element} Ana sayfa
 */
export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <main className="min-h-screen bg-theme-bg">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-theme-primary to-theme-primary-hover opacity-90" />
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="container relative mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-theme-bg">
            {t('home.hero.title')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-theme-bg/90">
            {t('home.hero.subtitle')}
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/universite/genel-bilgi">
              <Button size="lg" variant="default" className="bg-theme-bg text-theme-primary hover:bg-theme-bg/90 border border-theme-bg">
                {t('common.buttons.explore')}
              </Button>
            </Link>
            <Link href="/not-paylasimi">
              <Button size="lg" variant="default" className="bg-theme-primary text-theme-bg hover:bg-theme-primary-hover">
                {t('common.buttons.startSharing')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Öne Çıkan Özellikler */}
      <section className="py-24 bg-theme-bg">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-theme-text">
            {t('home.features.title')}
          </h2>
          <p className="text-theme-text-muted text-center mb-12 max-w-2xl mx-auto">
            {t('home.features.subtitle')}
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
                  {t('home.features.university.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-theme-text-muted">{t('home.features.university.description')}</p>
              </CardContent>
              <CardFooter>
                <Link href="/universite/genel-bilgi" className="w-full">
                  <Button variant="outline" className="w-full group-hover:bg-theme-primary group-hover:text-theme-bg border-theme-primary text-theme-primary transition-colors">
                    {t('common.buttons.moreInfo')}
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
                  {t('home.features.notes.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-theme-text-muted">{t('home.features.notes.description')}</p>
              </CardContent>
              <CardFooter>
                <Link href="/not-paylasimi" className="w-full">
                  <Button variant="outline" className="w-full group-hover:bg-theme-primary group-hover:text-theme-bg border-theme-primary text-theme-primary transition-colors">
                    {t('common.buttons.startSharing')}
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
                  {t('home.features.events.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-theme-text-muted">{t('home.features.events.description')}</p>
              </CardContent>
              <CardFooter>
                <Link href="/etkinlikler" className="w-full group-hover:bg-theme-primary group-hover:text-theme-bg border-theme-primary text-theme-primary transition-colors">
                  {t('common.buttons.moreInfo')}
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
                {t('home.about.title')}
              </h2>
              <p className="text-theme-text-muted mb-4">
                {t('home.about.description1')}
              </p>
              <p className="text-theme-text-muted mb-6">
                {t('home.about.description2')}
              </p>
              <div className="flex gap-4">
                <Link href="/universite/genel-bilgi">
                  <Button size="lg" className="bg-theme-primary text-theme-bg hover:bg-theme-primary-hover">
                    {t('common.buttons.moreInfo')}
                  </Button>
                </Link>
                <Link href="/universite/fakulteler">
                  <Button size="lg" variant="outline" className="text-theme-primary border-theme-primary hover:bg-theme-primary hover:text-theme-bg">
                    {t('common.buttons.viewFaculties')}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/university.jpg"
                alt={t('home.about.title')}
                className="object-cover w-full h-full"
                width={1000}
                height={1000}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-theme-bg to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Yapay Zeka Özellikleri */}
      <section className="py-24 bg-theme-bg/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-theme-text">
            {t('home.ai.title')}
          </h2>
          <p className="text-theme-text-muted text-center mb-12 max-w-2xl mx-auto">
            {t('home.ai.subtitle')}
          </p>
          <div className="max-w-xl mx-auto">
            <Card className="group hover:shadow-lg transition-all border-theme-primary/20 bg-theme-bg hover:border-theme-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-theme-text">
                  <svg className="h-6 w-6 text-theme-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {t('home.ai.guide.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-theme-text-muted">{t('home.ai.guide.description')}</p>
              </CardContent>
              <CardFooter>
                <Link href="/amasya/chatbot" className="w-full">
                  <Button variant="outline" className="w-full group-hover:bg-theme-primary group-hover:text-theme-bg border-theme-primary text-theme-primary transition-colors">
                    {t('home.ai.guide.button')}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Turistik Rehber */}
      <section className="py-24 bg-theme-bg">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl order-2 md:order-1">
              <Image
                src="/images/amasya.jpg"
                alt={t('home.tourism.title')}
                className="object-cover w-full h-full"
                width={1000}
                height={1000}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-theme-bg to-transparent" />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold mb-6 text-theme-text">
                {t('home.tourism.title')}
              </h2>
              <p className="text-theme-text-muted mb-4">
                {t('home.tourism.description1')}
              </p>
              <p className="text-theme-text-muted mb-6">
                {t('home.tourism.description2')}
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-2 text-theme-text">
                  <svg className="h-5 w-5 text-theme-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {t('home.tourism.features.locations')}
                </div>
                <div className="flex items-center gap-2 text-theme-text">
                  <svg className="h-5 w-5 text-theme-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  {t('home.tourism.features.routes')}
                </div>
                <div className="flex items-center gap-2 text-theme-text">
                  <svg className="h-5 w-5 text-theme-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                  </svg>
                  {t('home.tourism.features.cuisine')}
                </div>
              </div>
              <div className="flex gap-4">
                <Link href="/amasya/tarihi-yerler">
                  <Button size="lg" className="bg-theme-primary text-theme-bg hover:bg-theme-primary-hover">
                    {t('home.tourism.buttons.explore')}
                  </Button>
                </Link>
                <Link href="/amasya/gezi-rotalari">
                  <Button size="lg" variant="outline" className="text-theme-primary border-theme-primary hover:bg-theme-primary hover:text-theme-bg">
                    {t('home.tourism.buttons.routes')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
