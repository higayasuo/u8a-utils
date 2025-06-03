import { MAX_INT32 } from './constants';
import { writeUInt32BE } from './writeUInt32BE';

/**
 * Converts a 64-bit unsigned integer to a Uint8Array in big-endian format.
 * @param value The 64-bit unsigned integer to convert.
 * @returns A Uint8Array containing the 64-bit value in big-endian format.
 */
export const toUint64BE = (value: number) => {
  const high = Math.floor(value / MAX_INT32);
  const low = value % MAX_INT32;
  const buf = new Uint8Array(8);
  writeUInt32BE(buf, high, 0);
  writeUInt32BE(buf, low, 4);

  return buf;
};
