import { tr } from '@/locales/tr';
import { en } from '@/locales/en';

/**
 * Desteklenen diller
 */
export const languages = {
  tr: { name: 'Türkçe', code: 'tr', dict: tr },
  en: { name: 'English', code: 'en', dict: en },
};

/**
 * Varsayılan dil
 */
export const defaultLanguage = 'tr';

/**
 * Çeviri fonksiyonu
 * @param {string} key - Çeviri anahtarı (nokta notasyonu ile)
 * @returns {string} Çeviri metni
 */
export const t = (key) => {
  const currentLang = typeof window !== 'undefined' 
    ? window.localStorage.getItem('language') || defaultLanguage 
    : defaultLanguage;

  const keys = key.split('.');
  let value = languages[currentLang].dict;

  for (const k of keys) {
    if (value && value[k]) {
      value = value[k];
    } else {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
  }

  return value;
}; 