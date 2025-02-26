'use client';

import { useEffect, useState } from "react";
import Header from "@/components/header";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { t } from "@/lib/i18n";

/**
 * Üniversite genel bilgi sayfası
 * @returns {JSX.Element} Genel bilgi sayfası
 */
export default function GeneralInfo() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const statistics = [
    { label: t('university.generalInfo.statistics.students'), value: '20.815' },
    { label: t('university.generalInfo.statistics.academicStaff'), value: '733' },
    { label: t('university.generalInfo.statistics.administrativeStaff'), value: '628' },
    { label: t('university.generalInfo.statistics.faculties'), value: '11' },
    { label: t('university.generalInfo.statistics.institutes'), value: '3' },
    { label: t('university.generalInfo.statistics.schools'), value: '1' },
    { label: t('university.generalInfo.statistics.vocationalSchools'), value: '7' },
    { label: t('university.generalInfo.statistics.researchCenters'), value: '12' },
    { label: t('university.generalInfo.statistics.graduates'), value: '47.324' }
  ];

  return (
    <main className="min-h-screen bg-theme-bg">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/amasya-unversitesi.jpg"
            alt="Amasya Üniversitesi"
            className="object-cover w-full h-full brightness-[0.4]"
            width={1920}
            height={1080}
            priority
          />
        </div>
        <div className="relative text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            Amasya Üniversitesi
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Geleceğin bilim ve kültür merkezi
          </p>
        </div>
      </section>

      {/* Tarihçe */}
      <section className="py-16 bg-theme-bg">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-theme-text">
            {t('university.generalInfo.history.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <p className="text-theme-text-muted">
                {t('university.generalInfo.history.content1')}
              </p>
              <p className="text-theme-text-muted">
                {t('university.generalInfo.history.content2')}
              </p>
              <p className="text-theme-text-muted">
                {t('university.generalInfo.history.content3')}
              </p>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/kutuphane.jpg"
                alt={t('university.generalInfo.title')}
                className="object-cover w-full h-full"
                width={800}
                height={600}
              />
            </div>
          </div>
        </div>
      </section>

      {/* İstatistikler */}
      <section className="py-16 bg-theme-bg/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-theme-text">
            {t('university.generalInfo.statistics.title')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statistics.map((stat, index) => (
              <Card key={index} className="text-center p-6 border-theme-primary/20 bg-theme-bg hover:border-theme-primary transition-colors">
                <CardContent className="p-0">
                  <div className="text-4xl font-bold text-theme-primary mb-2">{stat.value}</div>
                  <div className="text-theme-text-muted">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Akademik Yapı */}
      <section className="py-16 bg-theme-bg">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-theme-text">
            {t('university.generalInfo.academicStructure.title')}
          </h2>
          
          <div className="space-y-16">
            {/* Fakülteler ve Bölümler */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <svg className="w-8 h-8 text-theme-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <h3 className="text-2xl font-semibold text-theme-text">
                  {t('university.generalInfo.academicStructure.faculties.title')}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    name: t('university.generalInfo.academicStructure.faculties.list.education.name'),
                    description: t('university.generalInfo.academicStructure.faculties.list.education.description')
                  },
                  {
                    name: t('university.generalInfo.academicStructure.faculties.list.arts.name'),
                    description: t('university.generalInfo.academicStructure.faculties.list.arts.description')
                  },
                  {
                    name: t('university.generalInfo.academicStructure.faculties.list.fineArts.name'),
                    description: t('university.generalInfo.academicStructure.faculties.list.fineArts.description')
                  },
                  {
                    name: t('university.generalInfo.academicStructure.faculties.list.theology.name'),
                    description: t('university.generalInfo.academicStructure.faculties.list.theology.description')
                  },
                  {
                    name: t('university.generalInfo.academicStructure.faculties.list.economics.name'),
                    description: t('university.generalInfo.academicStructure.faculties.list.economics.description')
                  },
                  {
                    name: t('university.generalInfo.academicStructure.faculties.list.architecture.name'),
                    description: t('university.generalInfo.academicStructure.faculties.list.architecture.description')
                  },
                  {
                    name: t('university.generalInfo.academicStructure.faculties.list.engineering.name'),
                    description: t('university.generalInfo.academicStructure.faculties.list.engineering.description')
                  },
                  {
                    name: t('university.generalInfo.academicStructure.faculties.list.health.name'),
                    description: t('university.generalInfo.academicStructure.faculties.list.health.description')
                  },
                  {
                    name: t('university.generalInfo.academicStructure.faculties.list.medicine.name'),
                    description: t('university.generalInfo.academicStructure.faculties.list.medicine.description')
                  }
                ].map((faculty, index) => (
                  <Card key={index} className="group hover:shadow-lg transition-all border-theme-primary/20 bg-theme-bg hover:border-theme-primary">
                    <CardContent className="p-6">
                      <div className="flex flex-col h-full">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-lg bg-theme-primary/10 flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-theme-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="text-lg font-medium text-theme-text group-hover:text-theme-primary transition-colors">
                              {faculty.name}
                            </h4>
                            <p className="text-sm text-theme-text-muted mt-1">
                              {faculty.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Enstitüler */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <svg className="w-8 h-8 text-theme-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <h3 className="text-2xl font-semibold text-theme-text">
                  {t('university.generalInfo.academicStructure.institutes.title')}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {t('university.generalInfo.academicStructure.institutes.items').map((institute, index) => (
                  <Card key={index} className="group hover:shadow-lg transition-all border-theme-primary/20 bg-theme-bg hover:border-theme-primary">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-theme-primary/10 flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-theme-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <div className="text-lg font-medium text-theme-text group-hover:text-theme-primary transition-colors">
                          {institute}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Yüksekokullar ve MYO'lar */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Yüksekokullar */}
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <svg className="w-8 h-8 text-theme-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                  </svg>
                  <h3 className="text-2xl font-semibold text-theme-text">
                    {t('university.generalInfo.academicStructure.schools.title')}
                  </h3>
                </div>

                <div className="space-y-4">
                  {t('university.generalInfo.academicStructure.schools.items').map((school, index) => (
                    <Card key={index} className="group hover:shadow-lg transition-all border-theme-primary/20 bg-theme-bg hover:border-theme-primary">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-theme-primary/10 flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-theme-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                            </svg>
                          </div>
                          <div className="text-lg font-medium text-theme-text group-hover:text-theme-primary transition-colors">
                            {school}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* MYO'lar */}
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <svg className="w-8 h-8 text-theme-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <h3 className="text-2xl font-semibold text-theme-text">
                    {t('university.generalInfo.academicStructure.vocationalSchools.title')}
                  </h3>
                </div>

                <div className="space-y-4">
                  {t('university.generalInfo.academicStructure.vocationalSchools.items').map((school, index) => (
                    <Card key={index} className="group hover:shadow-lg transition-all border-theme-primary/20 bg-theme-bg hover:border-theme-primary">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-theme-primary/10 flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-theme-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                          <div className="text-lg font-medium text-theme-text group-hover:text-theme-primary transition-colors">
                            {school}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Misyon ve Vizyon */}
      <section className="py-16 bg-theme-bg/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Card className="border-theme-primary/20 bg-theme-bg hover:border-theme-primary transition-colors">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-4 text-theme-text">
                  {t('university.generalInfo.mission.title')}
                </h3>
                <p className="text-theme-text-muted">
                  {t('university.generalInfo.mission.content')}
                </p>
              </CardContent>
            </Card>
            <Card className="border-theme-primary/20 bg-theme-bg hover:border-theme-primary transition-colors">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-4 text-theme-text">
                  {t('university.generalInfo.vision.title')}
                </h3>
                <p className="text-theme-text-muted">
                  {t('university.generalInfo.vision.content')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
} 