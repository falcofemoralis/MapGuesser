import React from 'react';
import { LatLng } from 'react-native-maps';
import { GameMode } from '../../constants/gamemode';
import { PlayMode } from '../../constants/playmode';
import { GameData } from '../../screens';
import { LoadingPreview } from '../interface/LoadingPreview/LoadingPreview';
import GoogleStreetViewWeb from './GoogleStreetViewWeb';

interface GoogleStreetViewProps {
  onMove: (coordinates: LatLng) => void;
  onInit: () => void;
  playMode: PlayMode;
  gameMode: GameMode;
  gameData?: GameData;
}
export const GoogleStreetView: React.FC<GoogleStreetViewProps> = ({ onMove, onInit, playMode, gameMode, gameData }) => {
  const [init, setInit] = React.useState(false);

  const onLoaded = (coordinates: LatLng) => {
    onMove(coordinates);
    if (!init) {
      onInit();
      setInit(true);
    }
  };
  return (
    <>
      {!init && <LoadingPreview />}
      <GoogleStreetViewWeb onMove={onLoaded} gameData={gameData} />
    </>
  );
};
