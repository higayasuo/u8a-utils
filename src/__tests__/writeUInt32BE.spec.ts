import { describe, it, expect } from 'vitest';
import { writeUInt32BE } from '../writeUInt32BE';
import { MAX_INT32 } from '../constants';

describe('writeUInt32BE', () => {
  it('should write a 32-bit unsigned integer in big-endian format', () => {
    const buf = new Uint8Array(4);
    writeUInt32BE(buf, 0x12345678);
    expect(buf).toEqual(new Uint8Array([0x12, 0x34, 0x56, 0x78]));
  });

  it('should write at the specified offset', () => {
    const buf = new Uint8Array(6);
    writeUInt32BE(buf, 0x12345678, 1);
    expect(buf).toEqual(new Uint8Array([0x00, 0x12, 0x34, 0x56, 0x78, 0x00]));
  });

  it('should handle zero value', () => {
    const buf = new Uint8Array(4);
    writeUInt32BE(buf, 0);
    expect(buf).toEqual(new Uint8Array([0x00, 0x00, 0x00, 0x00]));
  });

  it('should handle maximum value (MAX_INT32 - 1)', () => {
    const buf = new Uint8Array(4);
    writeUInt32BE(buf, MAX_INT32 - 1);
    expect(buf).toEqual(new Uint8Array([0xff, 0xff, 0xff, 0xff]));
  });

  it('should throw RangeError for negative values', () => {
    const buf = new Uint8Array(4);
    expect(() => writeUInt32BE(buf, -1)).toThrow(RangeError);
    expect(() => writeUInt32BE(buf, -1)).toThrow(
      `value must be >= 0 and <= ${MAX_INT32 - 1}. Received -1`,
    );
  });

  it('should throw RangeError for values >= MAX_INT32', () => {
    const buf = new Uint8Array(4);
    expect(() => writeUInt32BE(buf, MAX_INT32)).toThrow(RangeError);
    expect(() => writeUInt32BE(buf, MAX_INT32)).toThrow(
      `value must be >= 0 and <= ${MAX_INT32 - 1}. Received ${MAX_INT32}`,
    );
  });
});
