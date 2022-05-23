import { Continent } from '@/constants/continent';
import { Country } from '@/constants/country';

export type Places = number[][];

export type ContinentPlaces = { [k in Continent]: Places };

export type CountryPlaces = { [k in Continent]: { [k in Country]?: Places } };
