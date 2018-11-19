import { parseInput } from 'Parser';

describe('parseInput', () => {
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
    expect(result.readings['temp-2'].readingType).toBe('thermometer');
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
    expect(result.readings['temp-3'].readingType).toBe('thermometer');
  });

  describe('Error', () => {
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

    it('Reference without data', () => {
      expect(parseInput('Reference')).toBeNull();
    });

    it('Reference without numberic data', () => {
      expect(parseInput('Reference a2 2')).toBeNull();
    });

    it('Thermomether without name', () => {
      const result = parseInput(`reference 70.0 45.0
thermometer
2007-04-05T22:01 69.5
2007-04-05T22:02 70.1
2007-04-05T22:03 71.3
2007-04-05T22:04 71.5
2007-04-05T22:05 69.8
`);
      expect(result.readings.unnamed).not.toBeNull();
      expect(result.readings.unnamed).not.toBeUndefined();
    });

    it('Thermomether non numeric data', () => {
      const result = parseInput(`reference 70.0 45.0
thermometer temp
2007-04-05T22:01 6a9.5
`);
      expect(result.readings.temp.data[0].value).toBeNaN();
    });

    it('Starts with newLine', () => {
      const result = parseInput(`
reference 70.0 45.0
thermometer temp
2007-04-05T22:01 69.5
`);
      expect(result.readings.temp.data[0].value).toBe(69.5);
      expect(result.refs_therm).toBe(70);
      expect(result.refs_hum).toBe(45);
    });

    it('Reference with float', () => {
      const result = parseInput(`
reference 70.1 45.5
thermometer temp
2007-04-05T22:01 69.5
`);
      expect(result.refs_therm).toBe(70.1);
      expect(result.refs_hum).toBe(45.5);
    });

    it('Ends without newLine', () => {
      const result = parseInput(`reference 70.0 45.0
thermometer temp
2007-04-05T22:01 69.5`);
      expect(result.readings.temp.data[0].value).toBe(69.5);
    });
  });
});
