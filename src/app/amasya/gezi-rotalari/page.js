'use client';

import Header from "@/components/header";
import Chatbot from "@/components/chatbot";

/**
 * Gezi rotaları sayfası
 * @returns {JSX.Element} Gezi rotaları sayfası
 */
export default function TourRoutesPage() {
  return (
    <main className="min-h-screen bg-theme-bg">
      <Header />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Gezi Rotaları</h1>
        {/* Sayfa içeriği buraya gelecek */}
      </div>
      <Chatbot />
    </main>
  );
} 