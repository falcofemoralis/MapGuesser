import { Difficulty } from './../constants/difficulty';
import { Continent } from '@/constants/continent';
import { PlayMode } from '@/constants/playmode';
import { StreetViewMode } from '@/constants/streetviewmode';
import { LatLng } from 'react-native-maps';
import { Country } from '@/constants/country';
import { GameMode } from '@/types/gamemode.type';
import { GameCard } from '@/types/card.type';

export interface GameSettings extends GameMode {
  playMode: PlayMode;
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
  to?: LatLng;
  playtime: number;
}

export type RootStackParamList = {
  Main: undefined;
  Game: GameProps;
  Result: ResultProps;
  Select: SelectProps;
};
