'use client';

import { useState } from 'react';
import Header from "@/components/header";
import Chatbot from "@/components/chatbot";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { t } from "@/lib/i18n";

/**
 * Yöresel yemekler listesi
 */
const foods = {
  yemekler: [
    {
      name: "Keşkek",
      description: "Amasya'nın en meşhur yemeklerinden biri olan keşkek, düğün ve özel günlerde yapılan, dövme buğday ve et ile hazırlanan geleneksel bir yemektir.",
      image: "/yemekler/keskek.jpg",
      ingredients: [
        "Dövme buğday",
        "Kuzu eti",
        "Tereyağı",
        "Tuz",
        "Karabiber"
      ],
      preparationTime: "3-4 saat",
      difficulty: "Orta",
      servings: "6-8 kişilik"
    },
    {
      name: "Bakla Dolması",
      description: "Taze bakla içerisine pirinç, soğan ve çeşitli baharatlarla hazırlanan iç malzemesi doldurularak yapılan geleneksel bir Amasya yemeğidir.",
      image: "/yemekler/bakla-dolmasi.jpg",
      ingredients: [
        "Taze bakla",
        "Pirinç",
        "Soğan",
        "Maydanoz",
        "Zeytinyağı",
        "Baharatlar"
      ],
      preparationTime: "1 saat",
      difficulty: "Orta",
      servings: "4-6 kişilik"
    },
    {
      name: "Çatal Aşı",
      description: "Yufka parçaları üzerine kıymalı sos ve yoğurt dökülerek hazırlanan, Amasya'ya özgü bir mantı çeşididir.",
      image: "/yemekler/catal-asi.jpg",
      ingredients: [
        "Yufka",
        "Kıyma",
        "Soğan",
        "Yoğurt",
        "Tereyağı",
        "Baharatlar"
      ],
      preparationTime: "45 dakika",
      difficulty: "Kolay",
      servings: "4 kişilik"
    }
  ],
  tatlilar: [
    {
      name: "Amasya Çiçek Bamyası",
      description: "Amasya'nın meşhur tatlı çeşitlerinden biri olan çiçek bamyası, kurutulmuş bamyaların şerbetle tatlandırılmasıyla yapılır.",
      image: "/tatlilar/cicek-bamyasi.jpg",
      ingredients: [
        "Kurutulmuş çiçek bamya",
        "Şeker",
        "Su",
        "Limon"
      ],
      preparationTime: "30 dakika",
      difficulty: "Kolay",
      servings: "4-6 kişilik"
    },
    {
      name: "Amasya Elması Tatlısı",
      description: "Amasya'nın dünyaca ünlü elmaları kullanılarak yapılan, şerbetli bir tatlı çeşididir.",
      image: "/tatlilar/elma-tatlisi.jpg",
      ingredients: [
        "Amasya elması",
        "Şeker",
        "Su",
        "Tarçın",
        "Ceviz içi"
      ],
      preparationTime: "40 dakika",
      difficulty: "Kolay",
      servings: "6 kişilik"
    }
  ]
};

/**
 * Yöresel lezzetler sayfası
 * @returns {JSX.Element} Yöresel lezzetler sayfası
 */
export default function LocalFoodPage() {
  const [selectedCategory, setSelectedCategory] = useState("yemekler");

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
            Amasya Lezzetleri
          </h1>
          <p className="text-xl md:text-2xl text-theme-bg/90 max-w-3xl mx-auto">
            Binlerce yıllık tarihi ve kültürü ile harmanlanmış eşsiz tatlar
          </p>
        </div>
      </section>

      {/* İçerik */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="yemekler" onValueChange={setSelectedCategory}>
            <TabsList className="mb-8">
              <TabsTrigger value="yemekler">Ana Yemekler</TabsTrigger>
              <TabsTrigger value="tatlilar">Tatlılar</TabsTrigger>
            </TabsList>

            <TabsContent value="yemekler">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {foods.yemekler.map((food, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                      <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                    </div>
                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-semibold">{food.name}</h3>
                      <p className="text-theme-text-muted">{food.description}</p>
                      <div className="space-y-2">
                        <div>
                          <span className="font-medium">Hazırlama Süresi:</span> {food.preparationTime}
                        </div>
                        <div>
                          <span className="font-medium">Zorluk:</span> {food.difficulty}
                        </div>
                        <div>
                          <span className="font-medium">Porsiyon:</span> {food.servings}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Malzemeler:</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {food.ingredients.map((ingredient, i) => (
                            <li key={i} className="text-theme-text-muted">{ingredient}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tatlilar">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {foods.tatlilar.map((dessert, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                      <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                    </div>
                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-semibold">{dessert.name}</h3>
                      <p className="text-theme-text-muted">{dessert.description}</p>
                      <div className="space-y-2">
                        <div>
                          <span className="font-medium">Hazırlama Süresi:</span> {dessert.preparationTime}
                        </div>
                        <div>
                          <span className="font-medium">Zorluk:</span> {dessert.difficulty}
                        </div>
                        <div>
                          <span className="font-medium">Porsiyon:</span> {dessert.servings}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Malzemeler:</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {dessert.ingredients.map((ingredient, i) => (
                            <li key={i} className="text-theme-text-muted">{ingredient}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Chatbot />
    </main>
  );
} 