import { makeAutoObservable } from 'mobx';
import { Unit } from '../constants/unit';
import StorageManager from '../managers/storage.manager';
import { KeyEnum } from '../managers/storage.manager';
import Progress from '../types/progress';

class SettingsStore {
  unit: Unit = Unit.KM;

  constructor() {
    makeAutoObservable(this, {}, { deep: true });

    StorageManager.read<Unit>(KeyEnum.UNIT).then(u => {
      if (u) {
        this.unit = u;
      }
    });
  }

  updateUnit(unit: Unit) {
    this.unit = unit;
    StorageManager.write<Unit>(KeyEnum.UNIT, unit);
  }
}

export const settingsStore = new SettingsStore();
