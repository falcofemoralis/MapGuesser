import { makeAutoObservable, runInAction } from 'mobx';
import { Unit } from '../constants/unit';
import StorageManager, { StorageItem } from '../managers/storage.manager';

class SettingsStore {
  unit: Unit = Unit.KM;
  adsCounter: number = 0;

  constructor() {
    makeAutoObservable(this, {}, { deep: true });

    StorageManager.read<Unit>(StorageItem.UNIT).then(u => {
      if (u) {
        runInAction(() => {
          this.unit = u;
        });
      }
    });

    StorageManager.read<number>(StorageItem.ADS).then(c => {
      if (c) {
        runInAction(() => {
          this.adsCounter = c;
        });
      }
    });
  }

  /**
   * Update distance unit setting
   * @param unit - selected unit
   */
  updateUnit(unit: Unit) {
    StorageManager.write<Unit>(StorageItem.UNIT, unit);
    this.unit = unit;
  }

  /**
   * Update ads counter
   */
  async updateAdsCounter() {
    console.log(`counter 1: ${this.adsCounter}`);
    const newCounter = this.adsCounter + 1;
    console.log(`counter 2: ${newCounter}`);

    StorageManager.write<number>(StorageItem.ADS, newCounter);

    runInAction(() => {
      this.adsCounter = newCounter;
      console.log(`counter 3 ${this.adsCounter}`);
      console.log("-----");
      
    });
  }
}

export const settingsStore = new SettingsStore();
