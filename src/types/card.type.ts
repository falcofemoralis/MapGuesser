import { ImageSourcePropType } from 'react-native';
import { Continent } from '@/constants/continent';
import { Country } from '@/constants/country';
import { PlayMode } from '@/constants/playmode';

export interface Card {
  title: string;
  img: ImageSourcePropType;
}

export interface ContinentCard extends Card {
  continent: Continent;
}

export interface CountryCard extends Card {
  country: Country;
}

export interface GameCard extends Card {
  description: string;
  playMode: PlayMode;
  requiredLvl: number;
}
