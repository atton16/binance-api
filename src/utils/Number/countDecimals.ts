export const countDecimals = (v: number): number => {
  if (Math.floor(v) === v) { return 0; }
  return v.toString().split('.')[1].length || 0;
};
