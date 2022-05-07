export class Utils {
  static sleep = (ms: number) =>
    new Promise(resolve =>
      setTimeout(() => {
        resolve(0);
      }, ms)
    );
}
