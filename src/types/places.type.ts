import { Continent } from '@/constants/continent';
import { Country } from '@/constants/country';

export type Place = number[][];

export type ContinentPlaces = { [k in Continent]: Place };

export type CountryPlaces = { [k in Continent]: { [k in Country]?: Place } };
