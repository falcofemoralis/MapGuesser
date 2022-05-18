import { Country } from '@/constants/country';
import { ImageSourcePropType } from 'react-native';

export interface CountryCard {
  name: string;
  img: ImageSourcePropType;
  country: Country;
}
