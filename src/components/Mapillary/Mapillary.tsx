import React from 'react';
import { LatLng } from 'react-native-maps';
import { Game } from '../../constants/gametype';
import { Mode } from '../../constants/mode';
import { GameData } from '../../screens';
import { Image } from '../../services/images.service';
import { core } from '../../store/core.store';
import { LoadingPreview } from '../interface/LoadingPreview/LoadingPreview';
import MapillaryWeb from './MapillaryWeb';
import { observer } from 'mobx-react-lite';

interface MapillaryProps {
  onMove: (coordinates: LatLng) => void;
  onInit: () => void;
  game: Game;
  mode: Mode;
  data?: GameData;
}
const Mapillary: React.FC<MapillaryProps> = observer(({ onMove, onInit, mode, game, data }) => {
  const [attempts, setAttempts] = React.useState(0);

  const onSuccess = (image: Image) => {
    setAttempts(999);
    onInit();
  };

  const onFail = () => {
    setAttempts(attempts + 1);
  };

  if (!core.currentImage && attempts != 999) {
    core.init(game, data, onSuccess, onFail);
  }

  if (core.currentImage) {
    onMove({ latitude: core.currentImage.computed_geometry.coordinates[1], longitude: core.currentImage.computed_geometry.coordinates[0] });
  }

  return core.currentImage ? <MapillaryWeb imageId={core.currentImage.id} mode={mode} onMove={onMove} /> : <LoadingPreview attempts={attempts} />;
});

export default Mapillary;
