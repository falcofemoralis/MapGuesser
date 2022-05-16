import { LatLng } from 'react-native-maps';
import { GameSettings, PlayModeData } from './../screens/index';

export interface StreetViewSettings {
  onMove: (coordinates: LatLng) => void;
  onInit: () => void;
  gameSettings: GameSettings;
  playModeData?: PlayModeData;
}
