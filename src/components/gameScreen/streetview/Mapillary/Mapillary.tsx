import { LoadingPanel } from '@/components/interface/LoadingPanel/LoadingPanel';
import { StreetViewSettings } from '@/types/streetviewsettings';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Image } from './MapillaryImages.service';
import MapillaryWeb from './MapillaryWeb';
import { mapillaryСore } from './MapillaryСore';

const MAX_SEARCH_ATTEMPTS = 10;

interface MapillaryProps extends StreetViewSettings {
  /** Margin of sequence button */
  sequenceTop?: number;
}
const Mapillary: React.FC<MapillaryProps> = observer(({ onMove, onInit, gameSettings, gameData, sequenceTop }) => {
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
    mapillaryСore.init(gameSettings, gameData, onSuccess, onFail);
  }

  // if image is exist then emit coordinates update
  if (mapillaryСore.currentImage && mapillaryСore.currentImage.computed_geometry && mapillaryСore.currentImage.computed_geometry.coordinates) {
    onMove({ latitude: mapillaryСore.currentImage.computed_geometry.coordinates[1], longitude: mapillaryСore.currentImage.computed_geometry.coordinates[0] });
  }

  return (
    <>
      {mapillaryСore.currentImage ? (
        <MapillaryWeb imageId={mapillaryСore.currentImage.id} sequenceTop={sequenceTop} onMove={onMove} />
      ) : (
        <LoadingPanel progress={attempts / MAX_SEARCH_ATTEMPTS} />
      )}
    </>
  );
});

export default Mapillary;
