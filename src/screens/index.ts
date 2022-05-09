import { Continent } from './../constants/continent';
import { LatLng } from 'react-native-maps';
import { PlayMode } from '../constants/playmode';
import { GameMode } from '../constants/gamemode';

export interface GameData {
  round?: number;
  continent?: Continent;
}

interface GameProps {
  playMode: PlayMode;
  gameMode: GameMode; 
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
  Select: undefined;
};
