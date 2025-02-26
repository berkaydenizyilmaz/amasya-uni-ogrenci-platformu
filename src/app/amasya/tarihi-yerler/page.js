'use client';

import Header from "@/components/header";
import Chatbot from "@/components/chatbot";

/**
 * Tarihi yerler sayfası
 * @returns {JSX.Element} Tarihi yerler sayfası
 */
export default function HistoricalPlacesPage() {
  return (
    <main className="min-h-screen bg-theme-bg">
      <Header />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Tarihi Yerler</h1>
        {/* Sayfa içeriği buraya gelecek */}
      </div>
      <Chatbot />
    </main>
  );
} 