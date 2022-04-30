import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en, ru } from './src/translations';
const { languageDetectorPlugin } = require('./src/utils/languageDetectorPlugin');
import "intl-pluralrules"

//empty for now
const resources = {
  en: {
    translation: en
  },
  ru: {
    translation: ru
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
