import { LatLng } from 'react-native-maps';
import { GameSettings, GameData } from './../screens/index';

export interface StreetViewSettings {
  onMove: (coordinates: LatLng) => void;
  onInit: () => void;
  gameSettings: GameSettings;
  gameData?: GameData;
}
