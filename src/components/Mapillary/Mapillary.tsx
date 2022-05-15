import { observer } from 'mobx-react-lite';
import React from 'react';
import { View } from 'react-native';
import { GameMode } from '../../constants/gamemode';
import { StreetViewSettings } from '../../types/streetviewsettings';
import { Misc } from '../../values/misc';
import { LoadingPreview } from '../interface/LoadingPreview/LoadingPreview';
import { Image } from './MapillaryImages.service';
import MapillaryWeb, { SequenceButtonPosition } from './MapillaryWeb';
import { mapillaryСore } from './MapillaryСore.store';

const Mapillary: React.FC<StreetViewSettings> = observer(({ onMove, onInit, gameSettings, playModeData }) => {
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
    mapillaryСore.init(gameSettings.playMode, playModeData, onSuccess, onFail);
  }

  // if image is exist then emit coordinates update
  if (mapillaryСore.currentImage && mapillaryСore.currentImage.computed_geometry && mapillaryСore.currentImage.computed_geometry.coordinates) {
    onMove({ latitude: mapillaryСore.currentImage.computed_geometry.coordinates[1], longitude: mapillaryСore.currentImage.computed_geometry.coordinates[0] });
  }

  return (
    <>
      {mapillaryСore.currentImage ? (
        <MapillaryWeb
          imageId={mapillaryСore.currentImage.id}
          position={gameSettings.gameMode == GameMode.SINGLE ? SequenceButtonPosition.TOP : SequenceButtonPosition.MARGIN_TOP}
          onMove={onMove}
        />
      ) : (
        <LoadingPreview progress={attempts / Misc.MAX_SEARCH_ATTEMPTS} />
      )}
    </>
  );
});

export default Mapillary;
