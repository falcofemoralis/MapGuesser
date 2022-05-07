import { makeAutoObservable } from 'mobx';
import Round from '../types/round.type';

class GameStore {
  rounds: Round[] = []; // list of played rounds

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
}

export const gameStore = new GameStore();
