import * as turf from '@turf/turf';
import React from 'react';
import { Button } from 'react-native';
import { LatLng } from 'react-native-maps';
import Mapillary from '../components/Mapillary/Mapillary';
import SelectableMap from '../components/SelectableMap/SelectableMap';
import { gameStore } from '../store/GameStore';
import { generateCoordinate } from '../utils/CoordinatesUtil';

interface MapButtonProps {
  onMarkerSet: (coordinates: LatLng) => void;
}
const MapButton: React.FC<MapButtonProps> = ({ onMarkerSet }) => {
  console.log('MapButton');

  const [isMap, setMap] = React.useState(false);

  return (
    <>
      {isMap && <SelectableMap onMarkerSet={onMarkerSet} />}
      <Button title='Open Map' onPress={() => setMap(!isMap)}></Button>
    </>
  );
};

const Game = () => {
  console.log('Game');

  const startPoint = [generateCoordinate(-180, 180, 3), generateCoordinate(-90, 90, 3)];

  const onMove = (coordinates: LatLng) => {
    gameStore.currentCoordinates = coordinates;
  };

  const onMarkerSet = (coordinates: LatLng) => {
    gameStore.selectedCoordinates = coordinates;
  };

  const complete = () => {
    if (gameStore.currentCoordinates && gameStore.selectedCoordinates) {
      const from = turf.point([gameStore.currentCoordinates?.latitude, gameStore.currentCoordinates?.longitude]);
      const to = turf.point([gameStore.selectedCoordinates?.latitude, gameStore.selectedCoordinates?.longitude]);
      const distance = turf.distance(from, to, { units: 'kilometers' });

      console.log(`completed ${distance} kilometers`);
    }
  };

  return (
    <>
      <Mapillary onMove={onMove} startPoint={startPoint} />
      <MapButton onMarkerSet={onMarkerSet} />
      <Button title='Complete' onPress={complete}></Button>
    </>
  );
};

export default Game;
