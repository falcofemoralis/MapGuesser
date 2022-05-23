export class Utils {
  static sleep = (ms: number) =>
    new Promise(resolve =>
      setTimeout(() => {
        resolve(0);
      }, ms)
    );
  static random = (n: number) => Math.floor(Math.random() * n);
  static randomFromArray = <T>(arr: T[])=> arr[this.random(arr.length)];
}
