const formatNumber = (
  num: number | null | undefined = 0,
  precision = 4
): string => Number(num).toFixed(precision);

export default formatNumber;
