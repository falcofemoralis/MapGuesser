import { makeAutoObservable, runInAction } from 'mobx';
import { Unit } from '../constants/unit';
import StorageManager, { KeyEnum } from '../managers/storage.manager';
import { User } from './../types/user';

class SettingsStore {
  unit: Unit = Unit.KM;
  adsCounter: number = 0;
  user: User | null = null;

  constructor() {
    makeAutoObservable(this, {}, { deep: true });

    StorageManager.read<Unit>(KeyEnum.UNIT).then(u => {
      if (u) {
        runInAction(() => {
          this.unit = u;
        });
      }
    });

    StorageManager.read<number>(KeyEnum.ADS).then(c => {
      if (c) {
        runInAction(() => {
          this.adsCounter = c;
        });
      }
    });

    StorageManager.read<User>(KeyEnum.USER).then(u => {
      if (u) {
        runInAction(() => {
          this.user = u;
        });
      }
    });
  }

  updateUnit(unit: Unit) {
    StorageManager.write<Unit>(KeyEnum.UNIT, unit);
    this.unit = unit;
  }

  async updateAdsCounter() {
    StorageManager.write<number>(KeyEnum.ADS, this.adsCounter);

    runInAction(() => {
      this.adsCounter++;
    });
  }

  async updateUser(user: User) {
    StorageManager.write<User>(KeyEnum.USER, user);

    runInAction(() => {
      this.user = user;
    });
  }
}

export const settingsStore = new SettingsStore();
