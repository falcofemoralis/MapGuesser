import { makeAutoObservable, runInAction } from 'mobx';
import ProgressManager from '../managers/progress.manager';
import StorageManager, { StorageItem } from '../managers/storage.manager';
import Progress from '../types/progress.type';
import { User } from '../types/user.type';

class UserStore {
  user: User | null = null; // user (name, avatar, etc)
  progress: Progress = {
    playtime: 0,
    accuracy: [100],
    xp: 0,
    lvl: 1,
    totalXp: 0
  }; // user progress

  constructor() {
    makeAutoObservable(this, {}, { deep: true });

    StorageManager.read<Progress>(StorageItem.PROGRESS).then(p => {
      runInAction(() => {
        if (p) {
          this.progress = p;
        }
      });
    });

    StorageManager.read<User>(StorageItem.USER).then(u => {
      if (u) {
        runInAction(() => {
          this.user = u;
        });
      }
    });
  }

  /**
   * Add progress round to current one
   * @param newProgress - round progress
   */
  async addProgress(newProgress: Progress) {
    if (this.progress) {
      newProgress.accuracy.push(...this.progress.accuracy);
      newProgress.playtime += this.progress.playtime;
      newProgress.xp += this.progress.xp;
      newProgress.lvl = this.progress.lvl;
      newProgress.totalXp += this.progress.totalXp;
    }

    while (newProgress.xp > ProgressManager.lvl(newProgress?.lvl + 1)) {
      const xp_to_next_lvl = ProgressManager.lvl(newProgress?.lvl + 1);
      if (newProgress.xp > xp_to_next_lvl) {
        newProgress.xp -= xp_to_next_lvl;
        newProgress.lvl++;
      }
    }
    StorageManager.write<Progress>(StorageItem.PROGRESS, newProgress);

    runInAction(() => {
      this.progress = newProgress;
    });
  }

  /**
   * Update user
   * @param user - new user data
   */
  async updateUser(user: User) {
    StorageManager.write<User>(StorageItem.USER, user);

    runInAction(() => {
      this.user = user;
    });
  }
}

export const userStore = new UserStore();
