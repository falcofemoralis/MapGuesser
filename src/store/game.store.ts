import { LatLng } from 'react-native-maps';
import { CountryCard } from '@/types/card.type';
import { makeAutoObservable } from 'mobx';
import Round from '../types/round.type';

class GameStore {
  rounds: Round[] = []; // list of played rounds
  fromCoordinates: LatLng | undefined; // user street view coordinates
  toCoordinates: LatLng | undefined; // marker coordinates

  constructor() {
    makeAutoObservable(this, {}, { deep: true });
  }

  /**
   * Add round the list
   * @param round
   */
  addRound(round: Round) {
    this.rounds.push(round);
  }

  /**
   * Reset ronds list
   */
  resetRounds() {
    this.rounds = [];
  }

  resetCoordinates() {
    this.fromCoordinates = undefined;
    this.toCoordinates = undefined;
  }
}

export const gameStore = new GameStore();
