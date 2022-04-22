export const generateCoordinate = (from: number, to: number, fixed: number): number => {
  const n = Math.random() * (to - from) + from;
  return Number.parseFloat(n.toFixed(fixed));
};
