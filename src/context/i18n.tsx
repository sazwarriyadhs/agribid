
'use client';
import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import idTranslations from '@/locales/id.json';
import enTranslations from '@/locales/en.json';
import arTranslations from '@/locales/ar.json';
import zhTranslations from '@/locales/zh.json';
import esTranslations from '@/locales/es.json';
import ptTranslations from '@/locales/pt.json';
import frTranslations from '@/locales/fr.json';
import jaTranslations from '@/locales/ja.json';

import type { User } from './auth';
import { useAuth } from './auth';


export type Language = 'id' | 'en' | 'ar' | 'zh' | 'es' | 'pt' | 'fr' | 'ja';
export type Currency = 'idr' | 'usd' | 'eur' | 'jpy' | 'cny' | 'brl';
type Translations = typeof idTranslations;

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  t: (key: keyof Translations | string, fallback?: string | { [key: string]: string | number }) => string;
  formatCurrency: (value: number, options?: { in?: Currency }) => string;
}

const translations: Record<Language, Translations> = {
  id: idTranslations,
  en: enTranslations,
  ar: arTranslations,
  zh: zhTranslations,
  es: esTranslations,
  pt: ptTranslations,
  fr: frTranslations,
  ja: jaTranslations,
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('id');
  const [currency, setCurrency] = useState<Currency>('idr');
  const { user } = useAuth();
  
  useEffect(() => {
    if (user?.currency) {
      setCurrency(user.currency);
    }
  }, [user]);

  const t = useCallback((key: keyof Translations | string, options?: string | { [key: string]: string | number }) => {
    let translation = translations[language][key as keyof Translations] || translations['en'][key as keyof Translations] || key;
    
    if (typeof options === 'object' && options !== null) {
      Object.keys(options).forEach(optKey => {
        translation = translation.replace(`{{${optKey}}}`, String(options[optKey]));
      });
    } else if (typeof options === 'string') {
      translation = translation || options;
    }
    
    return translation;
  }, [language]);

  const formatCurrency = useCallback((value: number, options?: { in?: Currency }) => {
    const displayCurrency = options?.in || currency;

    const formatOptions: Intl.NumberFormatOptions = {
        style: 'currency',
        currency: displayCurrency.toUpperCase(),
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    };
    
    // We assume the base value is always in USD for calculation purposes.
    // So if the passed value is 100, it means $100.
    let convertedValue = value;
    switch (displayCurrency) {
        case 'idr':
            convertedValue = value * 15000;
            break;
        case 'jpy':
            convertedValue = value * 155;
            break;
        case 'eur':
            convertedValue = value * 0.92;
            break;
        case 'cny':
            convertedValue = value * 7.2;
            break;
        case 'brl':
            convertedValue = value * 5.1;
            break;
        // USD is the base, no conversion needed
        case 'usd':
        default:
             break;
    }

    const locale = language === 'id' ? 'id-ID' : 'en-US';
    return new Intl.NumberFormat(locale, formatOptions).format(convertedValue);
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
