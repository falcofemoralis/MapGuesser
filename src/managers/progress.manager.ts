import { Misc } from '../constants/misc';
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
    1 250
    2500 125
    5000 0 
    */
    return distance > Misc.ZERO_XP ? 1 : 250.04167 - 0.05001 * distance;
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
