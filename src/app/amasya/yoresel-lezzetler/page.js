'use client';

import { useState } from "react";
import Header from "@/components/header";
import Chatbot from "@/components/chatbot";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { t } from "@/lib/i18n";

/**
 * Yöresel lezzetler sayfası
 * @returns {JSX.Element} Yöresel lezzetler sayfası
 */
export default function LocalFoodPage() {
  const foods = {
    yemekler: [
      {
        id: 1,
        name: t('localFood.dishes.keskek.name'),
        description: t('localFood.dishes.keskek.description'),
        image: "/yemekler/keskek.jpeg",
        ingredients: t('localFood.dishes.keskek.ingredients'),
        prepTime: 120,
        difficulty: t('localFood.difficulty.hard'),
        servings: 6
      },
      {
        id: 2,
        name: t('localFood.dishes.baklaDolmasi.name'),
        description: t('localFood.dishes.baklaDolmasi.description'),
        image: "/yemekler/bakla-dolmasi.jpeg",
        ingredients: t('localFood.dishes.baklaDolmasi.ingredients'),
        prepTime: 60,
        difficulty: t('localFood.difficulty.medium'),
        servings: 4
      },
      {
        id: 3,
        name: t('localFood.dishes.catalAsi.name'),
        description: t('localFood.dishes.catalAsi.description'),
        image: "/yemekler/catal-asi.jpeg",
        ingredients: t('localFood.dishes.catalAsi.ingredients'),
        prepTime: 45,
        difficulty: t('localFood.difficulty.medium'),
        servings: 4
      }
    ],
    tatlilar: [
      {
        id: 1,
        name: t('localFood.desserts.cicekBamyasi.name'),
        description: t('localFood.desserts.cicekBamyasi.description'),
        image: "/yemekler/cicek-bamyasi.jpeg",
        ingredients: t('localFood.desserts.cicekBamyasi.ingredients'),
        prepTime: 30,
        difficulty: t('localFood.difficulty.easy'),
        servings: 4
      },
      {
        id: 2,
        name: t('localFood.desserts.elmaTatlisi.name'),
        description: t('localFood.desserts.elmaTatlisi.description'),
        image: "/yemekler/elma-tatlisi.jpeg",
        ingredients: t('localFood.desserts.elmaTatlisi.ingredients'),
        prepTime: 45,
        difficulty: t('localFood.difficulty.medium'),
        servings: 6
      }
    ]
  };

  return (
    <main className="min-h-screen bg-theme-bg">
      <Header />
      
      {/* Hero Section */}
      <div className="relative h-[50vh] mb-16">
        <Image
          src="/yemekler/keskek.jpeg"
          alt={t('localFood.title')}
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-center">
            {t('localFood.title')}
          </h1>
          <p className="text-xl md:text-2xl text-center max-w-2xl px-4">
            {t('localFood.subtitle')}
          </p>
        </div>
      </div>

      {/* İçerik */}
      <div className="container mx-auto px-4 pb-16">
        <Tabs defaultValue="yemekler" className="w-full">
          <TabsList className="w-full mb-8">
            <TabsTrigger value="yemekler" className="w-1/2">
              {t('localFood.tabs.mainDishes')}
            </TabsTrigger>
            <TabsTrigger value="tatlilar" className="w-1/2">
              {t('localFood.tabs.desserts')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="yemekler">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {foods.yemekler.map((food, index) => (
                <Card key={food.id} className="overflow-hidden">
                  <div className="relative h-64">
                    <Image
                      src={food.image}
                      alt={food.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-4 text-theme-primary">
                      {food.name}
                    </h3>
                    <p className="text-theme-text mb-6">
                      {food.description}
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 text-theme-primary">
                          {t('localFood.details.ingredients')}
                        </h4>
                        <ul className="list-disc list-inside text-theme-text">
                          {food.ingredients.map((ingredient, i) => (
                            <li key={i}>{ingredient}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-theme-text/60">
                            {t('localFood.details.prepTime')}
                          </p>
                          <p className="font-semibold">
                            {food.prepTime} {t('localFood.details.minutes')}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-theme-text/60">
                            {t('localFood.details.difficulty')}
                          </p>
                          <p className="font-semibold">{food.difficulty}</p>
                        </div>
                        <div>
                          <p className="text-sm text-theme-text/60">
                            {t('localFood.details.servings')}
                          </p>
                          <p className="font-semibold">{food.servings}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tatlilar">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {foods.tatlilar.map((food, index) => (
                <Card key={food.id} className="overflow-hidden">
                  <div className="relative h-64">
                    <Image
                      src={food.image}
                      alt={food.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-4 text-theme-primary">
                      {food.name}
                    </h3>
                    <p className="text-theme-text mb-6">
                      {food.description}
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 text-theme-primary">
                          {t('localFood.details.ingredients')}
                        </h4>
                        <ul className="list-disc list-inside text-theme-text">
                          {food.ingredients.map((ingredient, i) => (
                            <li key={i}>{ingredient}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-theme-text/60">
                            {t('localFood.details.prepTime')}
                          </p>
                          <p className="font-semibold">
                            {food.prepTime} {t('localFood.details.minutes')}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-theme-text/60">
                            {t('localFood.details.difficulty')}
                          </p>
                          <p className="font-semibold">{food.difficulty}</p>
                        </div>
                        <div>
                          <p className="text-sm text-theme-text/60">
                            {t('localFood.details.servings')}
                          </p>
                          <p className="font-semibold">{food.servings}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <Chatbot />
    </main>
  );
} 