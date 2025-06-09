import { describe, it, expect } from 'vitest';
import { ensureUint8Array } from '../ensureUint8Array';

describe('ensureUint8Array', () => {
  it('returns Uint8Array as-is', () => {
    const input = new Uint8Array([1, 2, 3]);
    const result = ensureUint8Array(input);
    expect(result).toBe(input); // Same reference
    expect(result).toEqual(new Uint8Array([1, 2, 3]));
  });

  it('converts ArrayLike<number> to Uint8Array', () => {
    const input = new Uint8Array([4, 5, 6]);
    const result = ensureUint8Array(input);
    expect(result).toBeInstanceOf(Uint8Array);
    expect(result).toEqual(new Uint8Array([4, 5, 6]));
  });

  it('handles TextEncoder output correctly in jsdom environment', () => {
    const encoded = new TextEncoder().encode('hello');
    expect(encoded instanceof Uint8Array).toBe(false); // In jsdom environment, TextEncoder.encode() returns a Uint8Array-like object that fails instanceof check

    const result = ensureUint8Array(encoded);
    expect(result).toBeInstanceOf(Uint8Array);
    expect(result).toEqual(new Uint8Array([104, 101, 108, 108, 111])); // 'hello' in UTF-8
  });

  it('handles empty input', () => {
    const input = new Uint8Array();
    const result = ensureUint8Array(input);
    expect(result).toBe(input);
    expect(result).toEqual(new Uint8Array());
  });

  it('handles empty Uint8Array input', () => {
    const input = new Uint8Array();
    const result = ensureUint8Array(input);
    expect(result).toBeInstanceOf(Uint8Array);
    expect(result).toEqual(new Uint8Array());
  });
});
