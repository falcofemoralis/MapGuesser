import { PlayMode } from '../constants/playmode';
import { GameMode } from '../constants/gamemode';
import { GameCard } from '../types/gamecard.type';

export const getGameCards = (t: any): GameCard[] => {
  return [
    {
      title: t('CLASSIC_NAME'),
      preview: require('../assets/classic.jpg'),
      description: t('CLASSIC_TITLE'),
      gameMode: GameMode.SINGLE,
      playMode: PlayMode.CLASSIC,
      requiredLvl: 0
    },
    {
      title: t('SETS_ROUND_NAME'),
      preview: require('../assets/rounds.jpg'),
      description: t('SETS_ROUND_TITLE'),
      gameMode: GameMode.ROUND,
      playMode: PlayMode.CLASSIC,
      requiredLvl: 3
    },
    {
      title: t('CONTINENTS_NAME'),
      preview: require('../assets/earth.jpg'),
      description: t('CONTINENTS_TITLE'),
      gameMode: GameMode.ROUND,
      playMode: PlayMode.CONTINENTS,
      requiredLvl: 6
    }
  ];
};
