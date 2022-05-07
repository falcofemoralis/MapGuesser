import { Continent } from '../constants/continent';
import { ContinentCard } from './../types/continentcard.type';

export const getContinentCards = (t: any): ContinentCard[] => {
  return [
    { name: t('AS'), img: require('../assets/asia.jpg'), continent: Continent.as },
    { name: t('EU'), img: require('../assets/europe.jpg'), continent: Continent.eu },
    { name: t('NA'), img: require('../assets/north_america.jpg'), continent: Continent.na },
    { name: t('SA'), img: require('../assets/south_america.jpg'), continent: Continent.sa },
    { name: t('AF'), img: require('../assets/africa.jpg'), continent: Continent.af },
    { name: t('AU'), img: require('../assets/australia.jpg'), continent: Continent.au }
  ];
};
