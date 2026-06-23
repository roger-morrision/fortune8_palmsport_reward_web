import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import bg from './locales/bg.translation.json';
import en from './locales/en.translation.json';

i18n.use(initReactI18next).init({
  lng: 'bg',
  fallbackLng: 'bg',
  resources: {
    en: {
      translation: en,
    },
    bg: {
      translation: bg,
    },
  },
  debug: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
