export const floor = (n: number, places: number): number => {
  const pow = Math.pow(10, places);
  return Math.floor(n * pow) / pow;
};
