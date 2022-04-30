import { Continent } from './../constants/continent';
import { LatLng } from 'react-native-maps';
import { Game } from '../constants/gametype';
import { Mode } from '../constants/mode';

export interface GameData {
  round?: number;
  continent?: Continent;
}

interface GameProps {
  game: Game; // classic, country, region, etc
  mode: Mode; // round, single
  data?: GameData;
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
  Settings: undefined;
};
