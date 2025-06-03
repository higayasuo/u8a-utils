import { describe, it, expect } from 'vitest';
import { fromB64U } from '../fromB64U';
import { toB64U } from '../toB64U';

describe('fromB64U', () => {
  it('converts empty string to empty Uint8Array', () => {
    expect(fromB64U('')).toEqual(new Uint8Array());
  });

  it('converts URL-safe Base64 to Uint8Array', () => {
    const input = 'AAECAwQF';
    expect(fromB64U(input)).toEqual(new Uint8Array([0, 1, 2, 3, 4, 5]));
  });

  it('converts URL-safe Base64 with special characters to Uint8Array', () => {
    const input = '__79_A';
    expect(fromB64U(input)).toEqual(new Uint8Array([255, 254, 253, 252]));
  });

  it('handles URL-safe Base64 with padding', () => {
    const input = 'AQIDBA==';
    expect(fromB64U(input)).toEqual(new Uint8Array([1, 2, 3, 4]));
  });

  it('handles URL-safe Base64 without padding', () => {
    const input = 'AQID';
    expect(fromB64U(input)).toEqual(new Uint8Array([1, 2, 3]));
  });

  it('round-trip conversion works correctly', () => {
    const original = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]);
    const b64u = toB64U(original);
    const result = fromB64U(b64u);
    expect(result).toEqual(original);
  });

  it('handles large Uint8Array', () => {
    const original = new Uint8Array(1000).fill(1);
    const b64u = toB64U(original);
    const result = fromB64U(b64u);
    expect(result).toEqual(original);
  });

  it('handles random data', () => {
    const original = new Uint8Array(100);
    for (let i = 0; i < original.length; i++) {
      original[i] = Math.floor(Math.random() * 256);
    }
    const b64u = toB64U(original);
    const result = fromB64U(b64u);
    expect(result).toEqual(original);
  });

  it('decodes Base64url string with "-" character to Uint8Array', () => {
    // The byte 251 (0xfb) in standard Base64 is '+w==', in Base64url is '-w=='
    const input = '-w';
    expect(fromB64U(input)).toEqual(new Uint8Array([251]));
  });
});
