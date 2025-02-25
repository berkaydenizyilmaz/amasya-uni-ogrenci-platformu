'use client';

import { useEffect, useState } from "react";
import Header from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Image from "next/image";
import { t } from "@/lib/i18n";

/**
 * Fakülteler ve bölümler sayfası
 * @returns {JSX.Element} Fakülteler sayfası
 */
export default function Faculties() {
  const [mounted, setMounted] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const faculties = [
    {
      key: 'education',
      name: t('university.generalInfo.academicStructure.faculties.list.education.name'),
      description: t('university.generalInfo.academicStructure.faculties.list.education.description'),
      departments: t('university.generalInfo.academicStructure.faculties.list.education.departments'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      key: 'arts',
      name: t('university.generalInfo.academicStructure.faculties.list.arts.name'),
      description: t('university.generalInfo.academicStructure.faculties.list.arts.description'),
      departments: t('university.generalInfo.academicStructure.faculties.list.arts.departments'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
    {
      key: 'fineArts',
      name: t('university.generalInfo.academicStructure.faculties.list.fineArts.name'),
      description: t('university.generalInfo.academicStructure.faculties.list.fineArts.description'),
      departments: t('university.generalInfo.academicStructure.faculties.list.fineArts.departments'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
    {
      key: 'theology',
      name: t('university.generalInfo.academicStructure.faculties.list.theology.name'),
      description: t('university.generalInfo.academicStructure.faculties.list.theology.description'),
      departments: t('university.generalInfo.academicStructure.faculties.list.theology.departments'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
    {
      key: 'economics',
      name: t('university.generalInfo.academicStructure.faculties.list.economics.name'),
      description: t('university.generalInfo.academicStructure.faculties.list.economics.description'),
      departments: t('university.generalInfo.academicStructure.faculties.list.economics.departments'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
    {
      key: 'architecture',
      name: t('university.generalInfo.academicStructure.faculties.list.architecture.name'),
      description: t('university.generalInfo.academicStructure.faculties.list.architecture.description'),
      departments: t('university.generalInfo.academicStructure.faculties.list.architecture.departments'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
    {
      key: 'engineering',
      name: t('university.generalInfo.academicStructure.faculties.list.engineering.name'),
      description: t('university.generalInfo.academicStructure.faculties.list.engineering.description'),
      departments: t('university.generalInfo.academicStructure.faculties.list.engineering.departments'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
    {
      key: 'health',
      name: t('university.generalInfo.academicStructure.faculties.list.health.name'),
      description: t('university.generalInfo.academicStructure.faculties.list.health.description'),
      departments: t('university.generalInfo.academicStructure.faculties.list.health.departments'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
    {
      key: 'medicine',
      name: t('university.generalInfo.academicStructure.faculties.list.medicine.name'),
      description: t('university.generalInfo.academicStructure.faculties.list.medicine.description'),
      departments: t('university.generalInfo.academicStructure.faculties.list.medicine.departments'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    }
  ];

  return (
    <main className="min-h-screen bg-theme-bg">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/fakulteler.jpg"
            alt={t('university.generalInfo.academicStructure.faculties.title')}
            className="object-cover w-full h-full"
            width={1920}
            height={1080}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-theme-primary to-theme-primary-hover opacity-90" />
        </div>
        <div className="relative text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-theme-bg">
            {t('university.generalInfo.academicStructure.faculties.title')}
          </h1>
          <p className="text-xl md:text-2xl text-theme-bg/90 max-w-3xl mx-auto">
            {t('university.generalInfo.academicStructure.faculties.subtitle')}
          </p>
        </div>
      </section>

      {/* Fakülteler Listesi */}
      <section className="py-16 bg-theme-bg">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Fakülte Kartları */}
            <div className="lg:col-span-1 space-y-4">
              {faculties.map((faculty, index) => (
                <Card 
                  key={index} 
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedFaculty === index 
                      ? 'border-theme-primary bg-theme-primary/5' 
                      : 'border-theme-primary/20 hover:border-theme-primary'
                  }`}
                  onClick={() => setSelectedFaculty(index)}
                >
                  <div className="p-4 flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${
                      selectedFaculty === index 
                        ? 'bg-theme-primary text-theme-bg' 
                        : 'bg-theme-primary/10 text-theme-primary'
                    }`}>
                      {faculty.icon}
                    </div>
                    <div>
                      <h3 className={`font-medium ${
                        selectedFaculty === index 
                          ? 'text-theme-primary' 
                          : 'text-theme-text'
                      }`}>
                        {faculty.name}
                      </h3>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Seçili Fakülte Detayı */}
            <div className="lg:col-span-2">
              {selectedFaculty !== null && (
                <Card className="border-theme-primary">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-4 bg-theme-primary/10 rounded-lg">
                        {faculties[selectedFaculty].icon}
                      </div>
                      <div>
                        <CardTitle className="text-2xl text-theme-text mb-2">
                          {faculties[selectedFaculty].name}
                        </CardTitle>
                        <p className="text-theme-text-muted">
                          {faculties[selectedFaculty].description}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mt-6">
                      <h4 className="text-lg font-medium text-theme-text mb-4">
                        {t('university.generalInfo.academicStructure.faculties.departments')}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Array.isArray(faculties[selectedFaculty].departments) && 
                          faculties[selectedFaculty].departments.map((department, idx) => (
                            <div 
                              key={idx} 
                              className="p-4 rounded-lg bg-theme-primary/5 text-theme-text-muted hover:bg-theme-primary/10 transition-colors"
                            >
                              {department}
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              {selectedFaculty === null && (
                <div className="h-full flex items-center justify-center text-theme-text-muted">
                  <p>Lütfen detaylarını görmek için bir fakülte seçin</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 