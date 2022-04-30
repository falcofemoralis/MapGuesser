import { ImageSourcePropType } from 'react-native';
import { Continent } from '../constants/continent';

export interface ContinentType {
  name: string;
  img: ImageSourcePropType;
  continent: Continent;
}
