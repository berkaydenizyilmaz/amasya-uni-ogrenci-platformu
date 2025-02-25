'use client';

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { languages, defaultLanguage } from "@/lib/i18n";

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
      <SelectTrigger className="w-[60px] bg-transparent border-theme-primary/20 px-2">
        <SelectValue placeholder={currentLang.toUpperCase()} />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(languages).map(([code]) => (
          <SelectItem key={code} value={code} className="px-2">
            {code.toUpperCase()}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
} 