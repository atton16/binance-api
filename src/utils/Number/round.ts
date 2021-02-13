export const round = (n: number, places: number): number => {
  const pow = Math.pow(10, places);
  return Math.round(n * pow) / pow;
};
