import { describe, it, expect } from 'vitest';
import { fromB64 } from '../fromB64';

describe('fromB64', () => {
  it('should return empty Uint8Array for empty string', () => {
    const result = fromB64('');
    expect(result).toBeInstanceOf(Uint8Array);
    expect(result.length).toBe(0);
  });

  it('should throw error for invalid Base64 characters', () => {
    // Test with various invalid characters
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
      // Create a string with invalid character in the middle
      const invalidB64 = `SGVsbG8${char}V29ybGQ=`;

      // The function should throw an error with "Invalid character" message
      expect(() => fromB64(invalidB64)).toThrow('Invalid character');
    }
  });

  it('should throw error for string with only invalid characters', () => {
    const invalidOnly = '!@#$%^&*()';
    expect(() => fromB64(invalidOnly)).toThrow('Invalid character');
  });

  it('should accept valid Base64 string with padding', () => {
    const validB64 = 'SGVsbG8=';
    const result = fromB64(validB64);
    expect(result).toBeInstanceOf(Uint8Array);
    expect(result).toEqual(new Uint8Array([72, 101, 108, 108, 111])); // "Hello"
  });

  it('should accept valid Base64 string without padding', () => {
    const validB64 = 'SGVsbG8';
    const result = fromB64(validB64);
    expect(result).toBeInstanceOf(Uint8Array);
    expect(result).toEqual(new Uint8Array([72, 101, 108, 108, 111])); // "Hello"
  });

  it('should throw error for invalid padding', () => {
    const invalidPadding = 'SGVsbG8==='; // Too many padding characters
    expect(() => fromB64(invalidPadding)).toThrow('Invalid character');
  });
});
