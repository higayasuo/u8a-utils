import { writeUInt32BE } from './writeUInt32BE';

/**
 * Converts a 32-bit unsigned integer to a Uint8Array in big-endian format.
 * @param value The 32-bit unsigned integer to convert.
 * @returns A Uint8Array containing the 32-bit value in big-endian format.
 */
export const toUint32BE = (value: number): Uint8Array => {
  const buffer = new Uint8Array(4);
  writeUInt32BE(buffer, value);
  return buffer;
};
