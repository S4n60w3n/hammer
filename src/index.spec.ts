import { evaluateLogFile } from 'index';

const EXAMPLE = `
reference 70.0 45.0
thermometer temp-1
2007-04-05T22:00 72.4
2007-04-05T22:01 76.0
2007-04-05T22:02 79.1
2007-04-05T22:03 75.6
2007-04-05T22:04 71.2
2007-04-05T22:05 71.4
2007-04-05T22:06 69.2
2007-04-05T22:07 65.2
2007-04-05T22:08 62.8
2007-04-05T22:09 61.4
2007-04-05T22:10 64.0
2007-04-05T22:11 67.5
2007-04-05T22:12 69.4
thermometer temp-2
2007-04-05T22:01 69.5
2007-04-05T22:02 70.1
2007-04-05T22:03 71.3
2007-04-05T22:04 71.5
2007-04-05T22:05 69.8
humidity hum-1
2007-04-05T22:04 45.2
2007-04-05T22:05 45.3
2007-04-05T22:06 45.1
humidity hum-2
2007-04-05T22:04 44.4
2007-04-05T22:05 43.9
2007-04-05T22:06 44.9
2007-04-05T22:07 43.8
2007-04-05T22:08 42.1
`;

describe('evaluateLogFile', () => {
  it('Example', () => {
    expect(evaluateLogFile(EXAMPLE)).toEqual({
      'temp-1': 'precise',
      'temp-2': 'ultra precise',
      'hum-1': 'keep',
      'hum-2': 'discard'
      });
  });

  describe('Error', () => {
    it('Empty', () => {
      expect(evaluateLogFile(``)).toBe(null);
    });

    it('null', () => {
      expect(evaluateLogFile(null)).toBe(null);
    });

    it('undefined', () => {
      expect(evaluateLogFile(undefined)).toBe(null);
    });

    it('start without reference', () => {
      expect(evaluateLogFile('Random text')).toBeNull();
    });

    it('Reference without data', () => {
      expect(evaluateLogFile('Reference')).toBeNull();
    });

    it('Reference without numberic data', () => {
      expect(evaluateLogFile('Reference a2 2')).toBeNull();
    });
  });
});
