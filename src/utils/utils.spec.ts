import { getStandardDeviation } from 'utils';

describe('StandardDeviation', () => {
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
