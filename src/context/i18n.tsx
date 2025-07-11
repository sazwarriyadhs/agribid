'use client';
import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import idTranslations from '@/locales/id.json';
import enTranslations from '@/locales/en.json';

type Language = 'id' | 'en';
type Currency = 'idr' | 'usd';
type Translations = typeof idTranslations;

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  t: (key: keyof Translations, options?: { [key: string]: string | number }) => string;
  formatCurrency: (value: number) => string;
}

const translations: Record<Language, Translations> = {
  id: idTranslations,
  en: enTranslations,
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('id');
  const [currency, setCurrency] = useState<Currency>('idr');

  const t = useCallback((key: keyof Translations, options?: { [key: string]: string | number }) => {
    let translation = translations[language][key] || translations['en'][key] || key;
    if (options) {
      Object.keys(options).forEach(optKey => {
        translation = translation.replace(`{{${optKey}}}`, String(options[optKey]));
      });
    }
    return translation;
  }, [language]);

  const formatCurrency = useCallback((value: number) => {
    const options: Intl.NumberFormatOptions = {
        style: 'currency',
        currency: currency.toUpperCase(),
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    };

    if (currency === 'idr') {
        // Convert dollar-based value to a reasonable IDR equivalent for display
        value = value * 15000;
    }

    const locale = language === 'id' ? 'id-ID' : 'en-US';
    return new Intl.NumberFormat(locale, options).format(value);
  }, [currency, language]);

  return (
    <I18nContext.Provider value={{ language, setLanguage, currency, setCurrency, t, formatCurrency }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
