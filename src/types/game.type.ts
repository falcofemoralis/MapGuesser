import { ImageSourcePropType } from 'react-native';
import { Game } from './../constants/gametype';
import { Mode } from './../constants/mode';

export interface GameType {
  title: string;
  preview: ImageSourcePropType;
  description: string;
  game: Game;
  mode: Mode;
  requiredLvl: number;
}
