type ThermometerResult = 'ultra precise' | 'very precise' | 'precise';
type HumidityResult = 'keep' | 'discard';

type Evaluation = {
  [name: string]: ThermometerResult | HumidityResult;
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
export const evaluateLogFile(log: string): Evaluation {
}
