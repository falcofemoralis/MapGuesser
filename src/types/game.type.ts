import { Mode } from './../constants/mode';
import { Game } from './../constants/gametype';
import { ImageSourcePropType } from 'react-native';

export interface GameType {
  title: string;
  preview: ImageSourcePropType;
  game: Game;
  mode: Mode;
}
