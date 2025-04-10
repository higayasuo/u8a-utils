import { describe, it, expect } from 'vitest';
import { uint64BE } from '../uint64BE';
import { MAX_INT32 } from '../constants';

describe('uint64BE', () => {
  it('should convert a 64-bit integer to big-endian format', () => {
    // Using a value that can be accurately represented in JavaScript
    // 0x1234567890000000
    const value = 0x12345678 * MAX_INT32 + 0x90000000;
    const result = uint64BE(value);
    expect(result).toEqual(
      new Uint8Array([0x12, 0x34, 0x56, 0x78, 0x90, 0x00, 0x00, 0x00]),
    );
  });

  it('should handle zero value', () => {
    const result = uint64BE(0);
    expect(result).toEqual(
      new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]),
    );
  });

  it('should handle 32-bit integer values', () => {
    const value = 0x12345678;
    const result = uint64BE(value);
    expect(result).toEqual(
      new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x12, 0x34, 0x56, 0x78]),
    );
  });

  it('should handle values that require both high and low parts', () => {
    // 0x0000000100000000
    const value = MAX_INT32;
    const result = uint64BE(value);
    expect(result).toEqual(
      new Uint8Array([0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00]),
    );
  });

  it('should handle maximum safe integer value', () => {
    const value = Number.MAX_SAFE_INTEGER;
    const result = uint64BE(value);
    expect(result).toEqual(
      new Uint8Array([0x00, 0x1f, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]),
    );
  });
});
