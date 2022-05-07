import { Misc } from '../values/misc';
export default class ProgressManager {
  /**
   * Calculate level experience by given level
   * @param lvl - lvl to calculate
   * @returns required xp to achieve given level
   */
  static lvl(lvl: number): number {
    /*    
    0 0
    1 100
    5 500 
    10 2000
    30 6000
    50 10000 
    */
    return 447.3142 + 28.336963 * Math.pow(lvl, 1.5);
  }

  /**
   * Calculate xp by given distance
   * @param distance - distance (in KM)
   * @returns xp
   */
  static xp(distance: number): number {
    /*    
    1 250 // MISC.MAX_XP !!!
    100 150 
    1000 70
    2500 25
    5000 0 
    */

    if (distance > Misc.ZERO_XP) {
      return 1;
    }

    if (distance <= 1) {
      return 250;
    }

    return Math.pow(15.808187 - 0.16448967 * Math.pow(Math.log(distance), 2), 2); //y^2 =
  }

  /**
   * Calculate accuracy by given distance
   * @param distance - distance (in KM)
   * @returns accuracy (in %)
   */
  static accuracy(distance: number): number {
    return distance > Misc.ZERO_ACCURACY ? 0 : 100 - (100 * distance) / Misc.ZERO_ACCURACY;
  }

  /**
   * Calculate user accuracy
   * @param accuracy - array of accuracy from each game (in %)
   * @returns user accuracy (in %)
   */
  static getTotalAccuracy(accuracy: number[]): number {
    let sum = 0;
    for (const a of accuracy) {
      sum += a;
    }

    return sum / accuracy.length;
  }
}
