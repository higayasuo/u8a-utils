import { describe, it, expect } from 'vitest';
import { encodeBase64Url } from '../encodeBase64Url';

describe('encodeBase64Url', () => {
  it('converts empty Uint8Array to empty string', () => {
    expect(encodeBase64Url(new Uint8Array())).toBe('');
  });

  it('converts Uint8Array to URL-safe Base64', () => {
    const input = new Uint8Array([0, 1, 2, 3, 4, 5]);
    expect(encodeBase64Url(input)).toBe('AAECAwQF');
  });

  it('converts Uint8Array with special characters to URL-safe Base64', () => {
    const input = new Uint8Array([255, 254, 253, 252]);
    expect(encodeBase64Url(input)).toBe('__79_A');
  });

  describe('URL-safe character conversion', () => {
    it('converts + to -', () => {
      // 251 (0xfb) in standard Base64 is '+w==', in Base64url is '-w'
      const input = new Uint8Array([251]);
      expect(encodeBase64Url(input)).toBe('-w');
    });

    it('converts / to _', () => {
      // 63 (0x3f) in standard Base64 is 'Pw==', in Base64url is 'Pw'
      const input = new Uint8Array([63]);
      expect(encodeBase64Url(input)).toBe('Pw');
    });

    it('converts multiple + and / characters', () => {
      // This creates a Uint8Array that will contain both '+' and '/' in its base64 representation
      const input = new Uint8Array([251, 63, 251, 63]);
      expect(encodeBase64Url(input)).toBe('-z_7Pw');
    });

    it('removes padding characters', () => {
      // Test cases for different padding lengths
      expect(encodeBase64Url(new Uint8Array([1, 2]))).toBe('AQI'); // 2 bytes -> no padding
      expect(encodeBase64Url(new Uint8Array([1, 2, 3]))).toBe('AQID'); // 3 bytes -> no padding
      expect(encodeBase64Url(new Uint8Array([1, 2, 3, 4]))).toBe('AQIDBA'); // 4 bytes -> no padding
    });
  });

  it('handles large Uint8Array', () => {
    const input = new Uint8Array(1000).fill(1);
    const result = encodeBase64Url(input);
    expect(result).not.toContain('+');
    expect(result).not.toContain('/');
    expect(result).not.toContain('=');
  });

  it('encodes a 32-byte Uint8Array with leading 0 correctly to Base64url', () => {
    const input = new Uint8Array(32);
    input[0] = 0;
    const result = encodeBase64Url(input);
    expect(result).toBe('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
  });
});
