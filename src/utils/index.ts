/**
 * Get standard deviation from an array of numbers
 * @param args array of numbers to get deviation from
 * @returns Deviation or -1 for error
 */
export const getStandardDeviation = (args: number[]): number => {
  if (!args) { return -1; }
  if (args.length <= 1) { return 0; }
  const sum = args.reduce((value, item) => value + item, 0);
  const mean = getMean(args);
  const meanDiff = args.map((item) => Math.pow(item - mean, 2)).reduce((value, item) => value + item, 0);

  return Math.sqrt(meanDiff / (args.length - 1));
};

/**
 * Get mean from an array of numbers
 * @param args array of numbers to get mean from
 * @returns mean or -1 for error
 */
export const getMean = (args: number[]): number => {
  if (!args) { return -1; }
  if (args.length === 0) { return 0; }

  return args.reduce((value, item) => value + item, 0) / args.length;
};
