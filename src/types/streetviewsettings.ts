import { GameSettings, PlayModeData } from './../screens/index';
import { LatLng } from 'react-native-maps';

export interface StreetViewSettings {
  onMove: (coordinates: LatLng) => void;
  onInit: () => void;
  gameSettings: GameSettings;
  playModeData?: PlayModeData;
}
