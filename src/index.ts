import { parseInput, Reading } from './Parser';
import { getStandardDeviation, getMean } from './utils';

type ErrorType = 'error';
type ThermometerResult = 'ultra precise' | 'very precise' | 'precise';
type HumidityResult = 'keep' | 'discard';
type EvaluationResult = ThermometerResult | HumidityResult | ErrorType;
type Evaluation = {
  [name: string]: EvaluationResult;
};

/**
 * An example log looks like the following.
 * The first line means that the room was held at a constant 70 degrees, 45% relative humidity.
 * Subsequent lines either identify a sensor (<type> <name>) or give a reading (<time> <value>).
 * reference 70.0 45.0
 * thermometer temp-1
 * 2007-04-05T22:00 72.4
 * ...
 * thermometer temp-2
 * 2007-04-05T22:01 69.5
 * ...
 * humidity hum-1
 * 2007-04-05T22:04 45.2
 * ...
 * humidity hum-2
 * 2007-04-05T22:04 44.4
 * ...
 * @param log log of the readings
 */
export const evaluateLogFile = (log: string): Evaluation  => {
  const parseResult = parseInput(log);
  if (!parseResult) { return null; }
  const { refs_therm, refs_hum } = parseResult;

  return Object.keys(parseResult.readings).reduce(
    (result: Evaluation, item) => {
      result[item] = evaluate(refs_therm, refs_hum, parseResult.readings[item]);

      return result;
    },
    {});
};

const evaluate = (refsTherm: number, refsHum: number, reading: Reading): EvaluationResult => {
  switch (reading.readingType) {
    case 'thermometer': return evaluateTherm(refsTherm, reading.data.map(item => item.value));
    case 'humidity': return evaluateHum(refsHum, reading.data.map(item => item.value));
    default: return 'error';
  }
};

const evaluateTherm = (value: number, values: number[]): EvaluationResult => {
  if (!value) { return 'error'; }
  const mean = getMean(values);
  if (Math.abs(value - mean) > 0.5) { return 'precise'; }
  const deviation = getStandardDeviation(values);
  if (deviation < 3) { return 'ultra precise'; }
  if (deviation < 5) { return 'very precise'; }

  return 'precise';
};

const evaluateHum = (value: number, values: number[]): EvaluationResult => {
  if (!value) { return 'error'; }
  for (const item of values) {
    if (!item && item !== 0) {
      return 'error';
    }
    const diff = Math.abs(value - item);
    if (diff >= 1) { return 'discard'; }
  }

  return 'keep';
};
