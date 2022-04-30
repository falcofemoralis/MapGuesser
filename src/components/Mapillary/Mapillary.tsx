import React from 'react';
import { LatLng } from 'react-native-maps';
import { Continent } from '../../constants/continent';
import { Game } from '../../constants/gametype';
import { Mode } from '../../constants/mode';
import { Regions } from '../../constants/regions';
import { GameData } from '../../screens';
import ImagesService from '../../services/images.service';
import { generateCoordinate } from '../../utils/coordinates.util';
import { LoadingPreview } from '../interface/LoadingPreview/LoadingPreview';
import MapillaryWeb from './MapillaryWeb';

interface MapillaryProps {
  onMove: (coordinates: LatLng) => void;
  onInit: () => void;
  game: Game;
  mode: Mode;
  data?: GameData;
}
const Mapillary: React.FC<MapillaryProps> = ({ onMove, onInit, mode, game, data }) => {
  const [imageId, setImageId] = React.useState<string | null>(null);

  const initMapillary = () => {
    let region;
    if (game == Game.CLASSIC) {
      const values = Object.values(Regions);
      region = values[Math.floor(Math.random() * values.length)];
    } else if (game == Game.CONTINENTS) {
      const keys = Object.keys(Regions);
      let selectedKey = Continent.na.toString();
      for (const key of keys) {
        if (data?.continent && key == data?.continent.toString()) {
          selectedKey = key;
          break;
        }
      }

      region = Regions[selectedKey as Continent];
    }

    if (region) {
      const randomPlace = region[Math.floor(Math.random() * region.length)];
      const startPoint = [generateCoordinate(randomPlace[1], randomPlace[3], 7), generateCoordinate(randomPlace[0], randomPlace[2], 7)];

      ImagesService.searchForImages(startPoint).then(images => {
        console.log(`Found ${images.length} images`);

        if (images.length > 20) {
          const imageNum = Math.floor(Math.random() * images.length);
          const image = images[imageNum];
          onMove({ latitude: image.computed_geometry.coordinates[1], longitude: image.computed_geometry.coordinates[0] });
          onInit();
          setImageId(image.id);
        } else {
          initMapillary();
        }
      });
    } else {
      console.log('region is null');
    }
  };

  if (!imageId) {
    initMapillary();
  }

  return imageId ? <MapillaryWeb imageId={imageId} mode={mode} /> : <LoadingPreview />;
};

export default Mapillary;
