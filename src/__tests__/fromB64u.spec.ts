import { describe, it, expect } from 'vitest';
import { fromB64u } from '../fromB64u';
import { toB64u } from '../toB64u';

describe('fromB64u', () => {
  it('converts empty string to empty Uint8Array', () => {
    const input = '';
    expect(fromB64u(input)).toEqual(new Uint8Array([]));
  });

  it('converts URL-safe Base64 string to Uint8Array', () => {
    const input = 'AQIDBA';
    expect(fromB64u(input)).toEqual(new Uint8Array([1, 2, 3, 4]));
  });

  it('handles URL-safe Base64 string with special characters', () => {
    const input = '_____w';
    expect(fromB64u(input)).toEqual(new Uint8Array([255, 255, 255, 255]));
  });

  it('handles URL-safe Base64 string without padding', () => {
    const input = 'AQID';
    expect(fromB64u(input)).toEqual(new Uint8Array([1, 2, 3]));
  });

  it('round-trip conversion works correctly', () => {
    const original = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]);
    const b64u = toB64u(original);
    const result = fromB64u(b64u);
    expect(result).toEqual(original);
  });

  it('handles large input', () => {
    const original = new Uint8Array(1000).fill(1);
    const b64u = toB64u(original);
    const result = fromB64u(b64u);
    expect(result).toEqual(original);
  });

  it('handles all possible byte values', () => {
    const original = new Uint8Array(256);
    for (let i = 0; i < 256; i++) {
      original[i] = i;
    }
    const b64u = toB64u(original);
    const result = fromB64u(b64u);
    expect(result).toEqual(original);
  });
});
