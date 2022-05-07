import { Lang } from '../types/lang.type';

export const getLanguages = (): Lang[] => {
  return [
    { code: 'en', name: 'English' },
    { code: 'ua', name: 'Українська' },
    { code: 'pl', name: 'Polskie' },
    { code: 'es', name: 'Español' },
    { code: 'ru', name: 'Русский' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' }
  ];
};
