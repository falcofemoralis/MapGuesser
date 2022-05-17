import { Continent } from '@/constants/continent';
import { GameMode } from '@/constants/gamemode';
import { PlayMode } from '@/constants/playmode';
import { StreetViewMode } from '@/constants/streetviewmode';
import { GameCard } from '@/types/gamecard.type';
import { LatLng } from 'react-native-maps';

export interface GameSettings {
  playMode: PlayMode;
  gameMode: GameMode;
  streetViewMode: StreetViewMode;
}

export interface PlayModeData {
  continent?: Continent;
  // country?: Country;
}

export interface SelectProps {
  gameCard: GameCard;
}

interface GameProps {
  gameSettings: GameSettings;
  playModeData?: PlayModeData;
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
