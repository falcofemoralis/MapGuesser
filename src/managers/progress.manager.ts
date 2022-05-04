import { Misc } from '../values/misc';
import { gameStore } from '../store/game.store';
export default class ProgressManager {
  static lvl(x: number): number {
    /*    
    0 0
    1 100
    5 500 
    10 2000
    30 6000
    50 10000 
    */
    return 447.3142 + 28.336963 * Math.pow(x, 1.5);
  }

  static xp(distance: number): number {
    /*    
    1 250 // MISC.MAX_XP !!!
    100 150 
    1000 70
    2500 25
    5000 0 
    */
    return distance > Misc.ZERO_XP ? 1 : Math.pow(15.808187 - 0.16448967 * Math.pow(Math.log(distance), 2), 2); //y^2 =
  }

  static accuracy(distance: number): number {
    return distance > Misc.ZERO_ACCURACY ? 0 : 100 - (100 * distance) / Misc.ZERO_ACCURACY;
  }

  static getTotalAccuracy(accuracy: number[]): number {
    let sum = 0;
    for (const a of accuracy) {
      sum += a;
    }

    return sum / accuracy.length;
  }
}
