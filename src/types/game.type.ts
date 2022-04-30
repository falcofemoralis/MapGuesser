import { Mode } from './../constants/mode';
import { Game } from './../constants/gametype';
import { ImageSourcePropType } from 'react-native';

export interface GameType {
  title: string;
  preview: ImageSourcePropType;
  description: string;
  game: Game;
  mode: Mode;
}
