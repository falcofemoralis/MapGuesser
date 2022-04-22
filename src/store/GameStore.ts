import { makeAutoObservable } from 'mobx';
import { LatLng } from 'react-native-maps';

class GameStore {
  currentCoordinates: LatLng | null = null;
  selectedCoordinates: LatLng | null = null;

  constructor() {
    makeAutoObservable(this);
  }
}

export const gameStore = new GameStore();
