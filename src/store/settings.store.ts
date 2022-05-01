import { User } from './../types/user';
import { makeAutoObservable } from 'mobx';
import { Unit } from '../constants/unit';
import StorageManager, { KeyEnum } from '../managers/storage.manager';
import { Use } from 'react-native-svg';

class SettingsStore {
  unit: Unit = Unit.KM;
  adsCounter: number = 0;
  user: User | null = null;

  constructor() {
    makeAutoObservable(this, {}, { deep: true });

    StorageManager.read<Unit>(KeyEnum.UNIT).then(u => {
      if (u) {
        this.unit = u;
      }
    });

    StorageManager.read<number>(KeyEnum.ADS).then(c => {
      if (c) {
        this.adsCounter = c;
      }
    });

    StorageManager.read<User>(KeyEnum.USER).then(u => {
      if (u) {
        this.user = u;
      }
    });
  }

  updateUnit(unit: Unit) {
    this.unit = unit;
    StorageManager.write<Unit>(KeyEnum.UNIT, unit);
  }

  async updateAdsCounter() {
    this.adsCounter++;
    StorageManager.write<number>(KeyEnum.ADS, this.adsCounter);
  }

  async updateUser(user: User) {
    this.user = user;
    StorageManager.write<User>(KeyEnum.USER, user);
  }
}

export const settingsStore = new SettingsStore();
