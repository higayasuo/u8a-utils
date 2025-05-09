import { describe, it, expect } from 'vitest';
import { fromHex } from '../fromHex';

describe('fromHex', () => {
  it('converts an empty string to an empty Uint8Array', () => {
    expect(fromHex('')).toEqual(new Uint8Array([]));
  });

  it('converts a single byte hex string to Uint8Array', () => {
    expect(fromHex('0a')).toEqual(new Uint8Array([0x0a]));
  });

  it('converts multiple bytes hex string to Uint8Array', () => {
    expect(fromHex('0a1b2c')).toEqual(new Uint8Array([0x0a, 0x1b, 0x2c]));
  });

  it('handles odd-length hex strings by padding with leading zero', () => {
    expect(fromHex('a1b')).toEqual(new Uint8Array([0x0a, 0x1b]));
  });

  it('removes whitespace from input', () => {
    expect(fromHex('0a 1b 2c')).toEqual(new Uint8Array([0x0a, 0x1b, 0x2c]));
  });

  it('throws error for invalid hex characters', () => {
    expect(() => fromHex('0g1b')).toThrow('Invalid hexadecimal string: "0g1b"');
  });

  it('handles uppercase hex characters', () => {
    expect(fromHex('0A1B2C')).toEqual(new Uint8Array([0x0a, 0x1b, 0x2c]));
  });
});
