import { makeAutoObservable } from 'mobx';
import { Unit } from '../constants/unit';
import StorageManager, { KeyEnum } from '../managers/storage.manager';

class SettingsStore {
  unit: Unit = Unit.KM;
  adsCounter: number = 0;

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
  }

  updateUnit(unit: Unit) {
    this.unit = unit;
    StorageManager.write<Unit>(KeyEnum.UNIT, unit);
  }

  async updateAdsCounter() {
    this.adsCounter++;
    StorageManager.write<number>(KeyEnum.ADS, this.adsCounter);
  }
}

export const settingsStore = new SettingsStore();
