import { observer } from 'mobx-react-lite';
import React from 'react';
import { LatLng } from 'react-native-maps';
import { GameMode } from '../../constants/gamemode';
import { PlayMode } from '../../constants/playmode';
import { GameData } from '../../screens';
import { Image } from './MapillaryImages.service';
import { mapillaryСore } from './MapillaryСore.store';
import { Misc } from '../../values/misc';
import { LoadingPreview } from '../interface/LoadingPreview/LoadingPreview';
import MapillaryWeb from './MapillaryWeb';

interface MapillaryProps {
  onMove: (coordinates: LatLng) => void;
  onInit: () => void;
  playMode: PlayMode;
  gameMode: GameMode;
  gameData?: GameData;
}
const Mapillary: React.FC<MapillaryProps> = observer(({ onMove, onInit, gameMode, playMode, gameData }) => {
  const [attempts, setAttempts] = React.useState(0); // count of fails to get a mapillary location

  /**
   * Success of getting image handler
   * @param image - StreetView image
   */
  const onSuccess = (image: Image) => {
    setAttempts(999);
    onInit();
  };

  /**
   * Fail of getting image handler
   */
  const onFail = () => {
    setAttempts(attempts + 1);
  };

  // if image is not exists and attempts is not 999, then try to init mapillary
  if (!mapillaryСore.currentImage && attempts != 999) {
    mapillaryСore.init(playMode, gameData, onSuccess, onFail);
  }

  // if image is exist then emit coordinates update
  if (mapillaryСore.currentImage && mapillaryСore.currentImage.computed_geometry.coordinates) {
    onMove({ latitude: mapillaryСore.currentImage.computed_geometry.coordinates[1], longitude: mapillaryСore.currentImage.computed_geometry.coordinates[0] });
  }

  return mapillaryСore.currentImage ? (
    <MapillaryWeb imageId={mapillaryСore.currentImage.id} gameMode={gameMode} onMove={onMove} />
  ) : (
    <LoadingPreview progress={(attempts ?? 0) / Misc.MAX_SEARCH_ATTEMPTS} />
  );
});

export default Mapillary;
