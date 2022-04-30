import { makeAutoObservable, runInAction } from 'mobx';
import ProgressManager from '../managers/progress.manager';
import StorageManager, { KeyEnum } from '../managers/storage.manager';
import Progress from '../objects/Progress';
import Round from '../objects/Round';

class GameStore {
  progress: Progress | null = null;
  rounds: Round[] = [];

  constructor() {
    makeAutoObservable(this, {}, { deep: true });

    StorageManager.read<Progress>(KeyEnum.PROGRESS).then(p => {
      runInAction(() => {
        if (p) {
          this.progress = p;
        } else {
          this.progress = {
            playtime: 0,
            accuracy: [100],
            xp: 0,
            lvl: 1
          };
        }
      });
    });
  }
  
  async updateProgress(newProgress: Progress) {
    if (this.progress) {
      newProgress.accuracy.push(...this.progress.accuracy);
      newProgress.playtime += this.progress.playtime;
      newProgress.xp += this.progress.xp;
      newProgress.lvl = this.progress.lvl;
    }

    while (newProgress.xp > ProgressManager.lvl(newProgress?.lvl + 1)) {
      const xp_to_next_lvl = ProgressManager.lvl(newProgress?.lvl + 1);
      if (newProgress.xp > xp_to_next_lvl) {
        newProgress.xp -= xp_to_next_lvl;
        newProgress.lvl++;
      }
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
