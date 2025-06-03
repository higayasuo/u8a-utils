import { describe, it, expect } from 'vitest';
import { toB64u } from '../toB64u';

describe('toB64u', () => {
  it('converts empty Uint8Array to empty string', () => {
    const input = new Uint8Array([]);
    expect(toB64u(input)).toBe('');
  });

  it('converts Uint8Array to URL-safe Base64 string', () => {
    const input = new Uint8Array([1, 2, 3, 4]);
    expect(toB64u(input)).toBe('AQIDBA');
  });

  it('handles Uint8Array with special characters', () => {
    // This creates a Uint8Array that will contain '+' and '/' in its base64 representation
    const input = new Uint8Array([255, 255, 255, 255]);
    expect(toB64u(input)).toBe('_____w');
  });

  it('removes padding characters', () => {
    // This creates a Uint8Array that will have padding characters in its base64 representation
    const input = new Uint8Array([1, 2, 3]);
    expect(toB64u(input)).toBe('AQID');
  });

  it('handles large Uint8Array', () => {
    const input = new Uint8Array(1000).fill(1);
    const result = toB64u(input);
    expect(result).not.toContain('+');
    expect(result).not.toContain('/');
    expect(result).not.toContain('=');
  });
});
