import { Difficulty } from './../constants/difficulty';
import { Continent } from '@/constants/continent';
import { GameMode } from '@/constants/gamemode';
import { PlayMode } from '@/constants/playmode';
import { StreetViewMode } from '@/constants/streetviewmode';
import { GameCard } from '@/types/gamecard.type';
import { LatLng } from 'react-native-maps';
import { Country } from '@/constants/country';

export interface GameSettings {
  playMode: PlayMode;
  gameMode: GameMode;
  streetViewMode: StreetViewMode;
  difficulty: Difficulty;
}

export interface GameData {
  continent?: Continent;
  time?: number;
  rounds?: number;
  country?: Country;
}

export interface SelectProps {
  gameCard: GameCard;
}

interface GameProps {
  gameSettings: GameSettings;
  gameData?: GameData;
}

interface ResultProps extends GameProps {
  from: LatLng;
  to: LatLng;
  playtime: number;
}

export type RootStackParamList = {
  Main: undefined;
  Game: GameProps;
  Result: ResultProps;
  Select: SelectProps;
};
