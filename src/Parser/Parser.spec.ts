import { parseInput } from 'Parser';

describe('parseInput', () => {
  it('Empty', () => {
    expect(parseInput(``)).toBe(null);
  });

  it('null', () => {
    expect(parseInput(null)).toBe(null);
  });

  it('undefined', () => {
    expect(parseInput(undefined)).toBe(null);
  });

  it('start without reference', () => {
    expect(parseInput('Random text')).toBeNull();
  });

  it('only reference', () => {
    const result = parseInput('reference 70.0 45.0');
    expect(result).not.toBeNull();
    expect(result.refs_therm).toBe(70);
    expect(result.refs_hum).toBe(45);
  });

  it('data, only one', () => {
    const result = parseInput(`reference 70.0 45.0
thermometer temp-2
2007-04-05T22:01 69.5
2007-04-05T22:02 70.1
2007-04-05T22:03 71.3
2007-04-05T22:04 71.5
2007-04-05T22:05 69.8
`);
    expect(result).not.toBeNull();
    expect(result.readings.length).toBe(1);
    expect(result.readings[0].name).toBe('temp-2');
  });

  it('data, only two', () => {
    const result = parseInput(`reference 70.0 45.0
thermometer temp-2
2007-04-05T22:01 69.5
2007-04-05T22:02 70.1
2007-04-05T22:03 71.3
2007-04-05T22:04 71.5
2007-04-05T22:05 69.8
thermometer temp-3
2007-04-05T22:01 69.5
2007-04-05T22:02 70.1
2007-04-05T22:03 71.3
2007-04-05T22:04 71.5
2007-04-05T22:05 69.8
`);
    expect(result).not.toBeNull();
    expect(result.readings.length).toBe(2);
    expect(result.readings[1].name).toBe('temp-3');
  });
});