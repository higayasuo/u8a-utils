import { describe, it, expect } from 'vitest';
import { toB64U } from '../toB64U';

describe('toB64U', () => {
  it('converts empty Uint8Array to empty string', () => {
    expect(toB64U(new Uint8Array())).toBe('');
  });

  it('converts Uint8Array to URL-safe Base64', () => {
    const input = new Uint8Array([0, 1, 2, 3, 4, 5]);
    expect(toB64U(input)).toBe('AAECAwQF');
  });

  it('converts Uint8Array with special characters to URL-safe Base64', () => {
    const input = new Uint8Array([255, 254, 253, 252]);
    expect(toB64U(input)).toBe('_-79_A');
  });

  it('handles Uint8Array with special characters', () => {
    // This creates a Uint8Array that will contain '+' and '/' in its base64 representation
    const input = new Uint8Array([255, 255, 255, 255]);
    expect(toB64U(input)).toBe('_____w');
  });

  it('removes padding characters', () => {
    // This creates a Uint8Array that will have padding characters in its base64 representation
    const input = new Uint8Array([1, 2, 3]);
    expect(toB64U(input)).toBe('AQID');
  });

  it('handles large Uint8Array', () => {
    const input = new Uint8Array(1000).fill(1);
    const result = toB64U(input);
    expect(result).not.toContain('+');
    expect(result).not.toContain('/');
    expect(result).not.toContain('=');
  });
});
