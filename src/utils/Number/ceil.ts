export const ceil = (n: number, places: number): number => {
  const pow = Math.pow(10, places);
  return Math.ceil(n * pow) / pow;
};
