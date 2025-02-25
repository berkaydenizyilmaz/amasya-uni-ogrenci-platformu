'use client';

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { languages, defaultLanguage, changeLanguage } from "@/lib/i18n";

/**
 * Dil değiştirme bileşeni
 * @returns {JSX.Element} Dil değiştirme bileşeni
 */
export default function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState(defaultLanguage);

  useEffect(() => {
    const savedLang = localStorage.getItem('language') || defaultLanguage;
    setCurrentLang(savedLang);
  }, []);

  const handleLanguageChange = (value) => {
    localStorage.setItem('language', value);
    setCurrentLang(value);
    window.location.reload();
  };

  return (
    <Select value={currentLang} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-[100px] bg-transparent border-theme-primary/20">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(languages).map(([code, lang]) => (
          <SelectItem key={code} value={code}>
            {lang.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
} 