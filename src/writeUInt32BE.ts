import { MAX_INT32 } from './constants';

/**
 * Writes a 32-bit unsigned integer to a Uint8Array in big-endian format.
 * @param u8array The Uint8Array to write to.
 * @param value The 32-bit unsigned integer to write.
 * @param offset The offset in the Uint8Array to start writing at. Defaults to 0.
 * @throws {RangeError} If the value is not in the range [0, MAX_INT32 - 1].
 */
export const writeUInt32BE = (
  u8array: Uint8Array,
  value: number,
  offset: number = 0,
) => {
  if (value < 0 || value >= MAX_INT32) {
    throw new RangeError(
      `value must be >= 0 and <= ${MAX_INT32 - 1}. Received ${value}`,
    );
  }
  u8array.set([value >>> 24, value >>> 16, value >>> 8, value & 0xff], offset);
};
