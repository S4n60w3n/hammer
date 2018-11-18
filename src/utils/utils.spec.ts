import { getStandardDeviation, getMean } from 'utils';

describe('Utils', () => {
  describe('getStandardDeviation', () => {
    it('Empty', () => {
      expect(getStandardDeviation([])).toBe(0);
    });

    it('null', () => {
      expect(getStandardDeviation(null)).toBe(-1);
    });

    it('undefined', () => {
      expect(getStandardDeviation(undefined)).toBe(-1);
    });

    it('single number', () => {
      expect(getStandardDeviation([5])).toBe(0);
    });

    it('two numbers', () => {
      expect(getStandardDeviation([5, 6]).toPrecision(3)).toBe('0.707');
    });

    it('multiple numbers', () => {
      expect(getStandardDeviation([727.7, 1086.5, 1091, 1361.3, 1490.5, 1956.1])).toBe(420.96248961952256);
    });
  });

  describe('getMean', () => {
    it('Empty', () => {
      expect(getMean([])).toBe(0);
    });

    it('null', () => {
      expect(getMean(null)).toBe(-1);
    });

    it('undefined', () => {
      expect(getMean(undefined)).toBe(-1);
    });

    it('single number', () => {
      expect(getMean([5])).toBe(5);
    });

    it('two numbers', () => {
      expect(getMean([5, 6])).toBe(5.5);
    });
  });
});
