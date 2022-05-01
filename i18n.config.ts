import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en, ua, es, ru, fr, de, pl } from './src/translations';
const { languageDetectorPlugin } = require('./src/utils/languageDetectorPlugin');
import 'intl-pluralrules';

//empty for now
const resources = {
  en: {
    translation: en
  },
  ua: {
    translation: ua
  },
  es: {
    translation: es
  },
  ru: {
    translation: ru
  },
  fr: {
    translation: fr
  },
  de: {
    translation: de
  },
  pl: {
    translation: pl
  }
};

i18n
  .use(initReactI18next)
  .use(languageDetectorPlugin)
  .init({
    resources,
    //language to use if translations in user language are not available
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // not needed for react!!
    },
    react: {
      useSuspense: false //in case you have any suspense related errors
    }
  });

export default i18n;
