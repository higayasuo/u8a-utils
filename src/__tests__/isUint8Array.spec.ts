import { describe, it, expect } from 'vitest';
import { isUint8Array } from '../isUint8Array';

describe('isUint8Array', () => {
  it('returns true for standard Uint8Array instances', () => {
    const input = new Uint8Array([1, 2, 3]);
    expect(isUint8Array(input)).toBe(true);
  });

  it('returns true for Uint8Array-like objects from TextEncoder', () => {
    const encoded = new TextEncoder().encode('hello');
    expect(encoded instanceof Uint8Array).toBe(false); // In jsdom environment
    expect(isUint8Array(encoded)).toBe(true);
  });

  it('returns false for regular arrays', () => {
    const input = [1, 2, 3];
    expect(isUint8Array(input)).toBe(false);
  });

  it('returns false for other ArrayBuffer views', () => {
    const input = new Int8Array([1, 2, 3]);
    expect(isUint8Array(input)).toBe(false);
  });

  it('returns false for null', () => {
    expect(isUint8Array(null)).toBe(false);
  });

  it('returns false for undefined', () => {
    expect(isUint8Array(undefined)).toBe(false);
  });

  it('returns false for non-array objects', () => {
    expect(isUint8Array({})).toBe(false);
    expect(isUint8Array('string')).toBe(false);
    expect(isUint8Array(123)).toBe(false);
  });
});
