import { describe, it, expect } from 'vitest';
import { encodeHex } from '../encodeHex';

describe('encodeHex', () => {
  it('converts an empty Uint8Array to an empty string', () => {
    const input = new Uint8Array([]);
    expect(encodeHex(input)).toBe('');
  });

  it('converts a single byte to a two-character hex string', () => {
    const input = new Uint8Array([0x0a]);
    expect(encodeHex(input)).toBe('0a');
  });

  it('converts multiple bytes to a hex string', () => {
    const input = new Uint8Array([0x00, 0xff, 0x0a, 0x1b]);
    expect(encodeHex(input)).toBe('00ff0a1b');
  });

  it('ensures each byte is represented by two characters', () => {
    const input = new Uint8Array([0x0, 0xf, 0xa, 0xb]);
    expect(encodeHex(input)).toBe('000f0a0b');
  });
});
