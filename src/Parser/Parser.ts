export type READING_TYPE = 'thermometer' | 'humidity';
export type READING = {
  name: string;
  readingType: string;
  data: string[];
};
export type InputResult = {
  refs_therm: number;
  refs_hum: number;
  readings: READING[];
};

const THERMOMETER = 'thermometer';
const HUMIDITY = 'humidity';

const READING_REGEX = `(${THERMOMETER}|${HUMIDITY})\\s+(.*)`;
const REFERENCE_REGEX = `\^reference\\s+(.*)\\s+(.*)`;

/**
 * Parse log
 */
export const parseInput = (input: string): InputResult => {
  if (!input) { return null; }
  const refRegexResult = input.match(REFERENCE_REGEX);
  if (!refRegexResult) { return null; }
  const ret: InputResult = {
    refs_therm: parseInt(refRegexResult[1], 10),
    refs_hum: parseInt(refRegexResult[2], 10),
    readings: []
  };
  let reading: READING = null;
  input.match(/[^\r\n]+/g).forEach((line) => {
    const regex = line.match(READING_REGEX);
    if (regex) {
      if (reading) {
        ret.readings.push(reading);
        reading = null;
      }
      reading = {
        name: regex[2],
        readingType: regex[1],
        data: []
      };
    } else if (reading) {
      reading.data.push(line);
    }
  });
  if (reading) {
    ret.readings.push(reading);
  }

  return ret;
};
