import React from 'react';
import { LatLng } from 'react-native-maps';
import { Continent } from '../../constants/continent';
import { Game } from '../../constants/gametype';
import { Mode } from '../../constants/mode';
import { Regions } from '../../data/regions';
import { GameData } from '../../screens';
import ImagesService from '../../services/images.service';
import { generateCoordinate } from '../../utils/coordinates.util';
import { Misc } from '../../values/misc';
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
  const [attempts, setAttempts] = React.useState(0);

  const runAsync = async (id: string) => {
    setTimeout(() => setImageId(id), 500);
  };

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

      ImagesService.searchForImages(startPoint)
        .then(images => {
          if (images.length > 20) {
            const imageNum = Math.floor(Math.random() * images.length);
            const image = images[imageNum];
            onMove({ latitude: image.computed_geometry.coordinates[1], longitude: image.computed_geometry.coordinates[0] });
            onInit();
            runAsync(image.id);
            setAttempts(Misc.MAX_SEARCH_ATTEMPTS);
          } else {
            setAttempts(attempts + 1);
            initMapillary();
          }
        })
        .catch(e => {
          console.error('error: searchForImages');
          setAttempts(attempts + 1);
          initMapillary();
        });
    } else {
      console.error('region is null');
    }
  };

  if (!imageId && attempts == 0) {
    initMapillary();
  }

  return imageId ? <MapillaryWeb imageId={imageId} mode={mode} /> : <LoadingPreview attempts={attempts} />;
};

export default Mapillary;
