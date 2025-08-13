import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './public/locales/en.json';
import frTranslation from './public/locales/fr.json';
import swTranslation from './public/locales/sw.json';
import arTranslation from './public/locales/ar.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      fr: { translation: frTranslation },
      sw: { translation: swTranslation },
      ar: { translation: arTranslation },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;