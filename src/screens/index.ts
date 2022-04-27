import { LatLng } from 'react-native-maps';
import { GameType } from '../constants/gametype';
import { Mode } from '../constants/mode';

export interface RoundData {
  round: number;
}

interface GameProps {
  gameType: GameType; // classic, country, region, etc
  mode: Mode; // round, single
  data?: RoundData;
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
};
