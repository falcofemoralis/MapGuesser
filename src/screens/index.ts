import {LatLng} from 'react-native-maps';

export type RootStackParamList = {
  Main: undefined;
  Game: undefined;
  Result: { from: LatLng, to: LatLng };
};
