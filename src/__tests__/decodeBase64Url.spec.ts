import { describe, it, expect } from 'vitest';
import { decodeBase64Url } from '../decodeBase64Url';
import { toB64U } from '../encodeBase64Url';

describe('decodeBase64Url', () => {
  describe('valid inputs', () => {
    it('converts empty string to empty Uint8Array', () => {
      expect(decodeBase64Url('')).toEqual(new Uint8Array());
    });

    it('converts URL-safe Base64 to Uint8Array', () => {
      const input = 'AAECAwQF';
      expect(decodeBase64Url(input)).toEqual(
        new Uint8Array([0, 1, 2, 3, 4, 5]),
      );
    });

    it('converts URL-safe Base64 with special characters to Uint8Array', () => {
      const input = '__79_A';
      expect(decodeBase64Url(input)).toEqual(
        new Uint8Array([255, 254, 253, 252]),
      );
    });

    it('handles URL-safe Base64 with padding', () => {
      const input = 'AQIDBA==';
      expect(decodeBase64Url(input)).toEqual(new Uint8Array([1, 2, 3, 4]));
    });

    it('handles URL-safe Base64 without padding', () => {
      const input = 'AQID';
      expect(decodeBase64Url(input)).toEqual(new Uint8Array([1, 2, 3]));
    });

    it('decodes Base64url string with "-" character to Uint8Array', () => {
      const input = '-w';
      expect(decodeBase64Url(input)).toEqual(new Uint8Array([251]));
    });
  });

  describe('round-trip conversion', () => {
    it('works correctly for small data', () => {
      const original = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]);
      const b64u = toB64U(original);
      const result = decodeBase64Url(b64u);
      expect(result).toEqual(original);
    });

    it('works correctly for large data', () => {
      const original = new Uint8Array(1000).fill(1);
      const b64u = toB64U(original);
      const result = decodeBase64Url(b64u);
      expect(result).toEqual(original);
    });

    it('works correctly for random data', () => {
      const original = new Uint8Array(100);
      for (let i = 0; i < original.length; i++) {
        original[i] = Math.floor(Math.random() * 256);
      }
      const b64u = toB64U(original);
      const result = decodeBase64Url(b64u);
      expect(result).toEqual(original);
    });
  });

  describe('error cases', () => {
    it('throws error for invalid padding at the end of the string', () => {
      expect(() => decodeBase64Url('AQIDBA=')).toThrow('Invalid character');
    });

    it('throws error for invalid padding with multiple padding characters', () => {
      expect(() => decodeBase64Url('AQIDBA===')).toThrow('Invalid character');
    });

    it('throws error for invalid Base64 characters', () => {
      const invalidChars = [
        '!',
        '@',
        '#',
        '$',
        '%',
        '^',
        '&',
        '*',
        '(',
        ')',
        ' ',
        '\n',
        '\t',
      ];

      for (const char of invalidChars) {
        const invalidB64U = `SGVsbG8${char}V29ybGQ=`;
        expect(() => decodeBase64Url(invalidB64U)).toThrow('Invalid character');
      }
    });

    it('throws error for string with only invalid characters', () => {
      const invalidOnly = '!@#$%^&*()';
      expect(() => decodeBase64Url(invalidOnly)).toThrow('Invalid character');
    });
  });
});
