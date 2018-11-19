export type ReadingType = 'thermometer' | 'humidity';

export type Reading = {
  readingType: string;
  data: DataType[];
};

export type InputResult = {
  refs_therm: number;
  refs_hum: number;
  readings: { [name: string]: Reading };
};

export type DataType = {
  time: string;
  value: number;
};

const THERMOMETER = 'thermometer';
const HUMIDITY = 'humidity';
const UNNAMED = 'unnamed';

const READING_REGEX = `(${THERMOMETER}|${HUMIDITY})\\s*(.*)`;
const REFERENCE_REGEX = `\^\\s*reference\\s+(.*)\\s+(.*)`;

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
    readings: {}
  };
  let reading: Reading = null;
  let name: string = UNNAMED;
  input.match(/[^\r\n]+/g).forEach((line) => {
    const regex = line.match(READING_REGEX);
    if (regex) {
      if (reading) {
        ret.readings[name] = reading;
        reading = null;
        name = null;
      }
      name = regex[2] || UNNAMED;
      reading = {
        readingType: regex[1],
        data: []
      };
    } else if (reading) {
      reading.data.push(parseData(line));
    }
  });
  if (reading) {
    ret.readings[name] = reading;
  }

  return ret;
};

const parseData = (dataLine: string): DataType => {
  const [ time, value ] = dataLine.split(' ');

  return {
    time,
    value: Number(value)
  };
};
