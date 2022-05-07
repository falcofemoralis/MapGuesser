import { ImageSourcePropType } from 'react-native';
import { Continent } from '../constants/continent';

export interface ContinentCard {
  name: string;
  img: ImageSourcePropType;
  continent: Continent;
}
