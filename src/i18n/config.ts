import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from '../locales/en/translation.json';
import plTranslations from '../locales/pl/translation.json';
import ruTranslations from '../locales/ru/translation.json';
import nlTranslations from '../locales/nl/translation.json';
import esTranslations from '../locales/es/translation.json';
import arTranslations from '../locales/ar/translation.json';
import deTranslations from '../locales/de/translation.json';
import frTranslations from '../locales/fr/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      pl: { translation: plTranslations },
      ru: { translation: ruTranslations },
      nl: { translation: nlTranslations },
      es: { translation: esTranslations },
      ar: { translation: arTranslations },
      de: { translation: deTranslations },
      fr: { translation: frTranslations },
    },
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

