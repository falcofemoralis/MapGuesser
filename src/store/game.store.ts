import { makeAutoObservable, runInAction } from 'mobx';
import StorageManager, { KeyEnum } from '../managers/storage.manager';
import Round from '../objects/Round';
import Progress from '../objects/User';

class GameStore {
  progress: Progress | undefined | null = null;
  rounds: Round[] = [];

  constructor() {
    makeAutoObservable(this, {}, { deep: true });
  }

  async initProgress() {
    const p = await StorageManager.read<Progress>(KeyEnum.PROGRESS);
    runInAction(() => {
      this.progress = p;
    });
  }

  async updateProgress(newProgress: Progress) {
    const progress = await StorageManager.read<Progress>(KeyEnum.PROGRESS);

    if (progress) {
      newProgress.accuracy += progress.accuracy;
      newProgress.playtime += progress.playtime;
      newProgress.xp += progress.xp;
    }

    StorageManager.write<Progress>(KeyEnum.PROGRESS, newProgress);

    runInAction(() => {
      this.progress = newProgress;
    });
  }

  addRound(round: Round) {
    this.rounds.push(round);
  }

  resetRounds() {
    this.rounds = [];
  }
}

export const gameStore = new GameStore();
