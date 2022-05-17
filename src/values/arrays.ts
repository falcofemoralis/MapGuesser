import { TFunction } from 'react-i18next';
import { Continent } from '@/constants/continent';
import { PlayMode } from '@/constants/playmode';
import { ContinentCard } from '@/types/continentcard.type';
import { GameCard } from '@/types/gamecard.type';
import { Lang } from '@/types/lang.type';

export class Arrays {
  static getGameCards = (t: TFunction<"ns1", undefined>): GameCard[] => [
    {
      title: t('NORMAL_MODE'),
      preview: require('@/assets/classic.jpg'),
      description: t('NORMAL_TITLE'),
      playMode: PlayMode.NORMAL,
      requiredLvl: 0
    },
    {
      title: t('CONTINENTS_MODE'),
      preview: require('@/assets/earth.jpg'),
      description: t('CONTINENTS_TITLE'),
      playMode: PlayMode.CONTINENTS,
      requiredLvl: 0
    },
    {
      title: t('COUNTRY_MODE'),
      preview: require('@/assets/rounds.jpg'),
      description: t('COUNTRY_TITLE'),
      playMode: PlayMode.COUNTRIES,
      requiredLvl: 5
    }
  ];
  static getContinentCards = (t: TFunction<"ns1", undefined>): ContinentCard[] => [
    { name: t('AS'), img: require('@/assets/asia.jpg'), continent: Continent.as },
    { name: t('EU'), img: require('@/assets/europe.jpg'), continent: Continent.eu },
    { name: t('NA'), img: require('@/assets/north_america.jpg'), continent: Continent.na },
    { name: t('SA'), img: require('@/assets/south_america.jpg'), continent: Continent.sa },
    { name: t('AF'), img: require('@/assets/africa.jpg'), continent: Continent.af },
    { name: t('AU'), img: require('@/assets/australia.jpg'), continent: Continent.au }
  ];
  static getLanguages = (): Lang[] => [
    { code: 'en', name: 'English' },
    { code: 'ua', name: 'Українська' },
    { code: 'pl', name: 'Polskie' },
    { code: 'es', name: 'Español' },
    { code: 'ru', name: 'Русский' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' }
  ];
}
