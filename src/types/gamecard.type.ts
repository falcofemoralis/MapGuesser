import { ImageSourcePropType } from 'react-native';
import { PlayMode } from '../constants/playmode';
import { GameMode } from '../constants/gamemode';

export interface GameCard {
  title: string;
  preview: ImageSourcePropType;
  description: string;
  playMode: PlayMode;
  requiredLvl: number;
}
