import { describe, it, expect } from 'vitest';
import { ensureUint8Array } from '../ensureUint8Array';

describe('ensureUint8Array', () => {
  it('should return the same Uint8Array instance when input is already Uint8Array', () => {
    const input = new Uint8Array([1, 2, 3]);
    const result = ensureUint8Array(input);
    expect(result).toBe(input);
    expect(result).toEqual(new Uint8Array([1, 2, 3]));
  });

  it('should convert ArrayLike<number> to Uint8Array', () => {
    const input = [1, 2, 3] as unknown as Uint8Array;
    const result = ensureUint8Array(input);
    expect(result).toBeInstanceOf(Uint8Array);
    expect(result).toEqual(new Uint8Array([1, 2, 3]));
  });

  it('should handle Uint32Array input and preserve bytes in little-endian', () => {
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);
    view.setUint32(0, 0x12345678, true); // true for little-endian
    const input = new Uint32Array(buffer) as unknown as Uint8Array;
    const result = ensureUint8Array(input);
    expect(result).toBeInstanceOf(Uint8Array);
    expect(result.byteLength).toBe(4);
    expect(result).toEqual(new Uint8Array([0x78, 0x56, 0x34, 0x12])); // Little endian
  });

  it('should handle Uint32Array input and preserve bytes in big-endian', () => {
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);
    view.setUint32(0, 0x12345678, false); // false for big-endian
    const input = new Uint32Array(buffer) as unknown as Uint8Array;
    const result = ensureUint8Array(input);
    expect(result).toBeInstanceOf(Uint8Array);
    expect(result.byteLength).toBe(4);
    expect(result).toEqual(new Uint8Array([0x12, 0x34, 0x56, 0x78])); // Big endian
  });

  it('should handle Int16Array input and preserve bytes in little-endian', () => {
    const buffer = new ArrayBuffer(2);
    const view = new DataView(buffer);
    view.setInt16(0, 0x1234, true); // true for little-endian
    const input = new Int16Array(buffer) as unknown as Uint8Array;
    const result = ensureUint8Array(input);
    expect(result).toBeInstanceOf(Uint8Array);
    expect(result.byteLength).toBe(2);
    expect(result).toEqual(new Uint8Array([0x34, 0x12])); // Little endian
  });

  it('should handle Int16Array input and preserve bytes in big-endian', () => {
    const buffer = new ArrayBuffer(2);
    const view = new DataView(buffer);
    view.setInt16(0, 0x1234, false); // false for big-endian
    const input = new Int16Array(buffer) as unknown as Uint8Array;
    const result = ensureUint8Array(input);
    expect(result).toBeInstanceOf(Uint8Array);
    expect(result.byteLength).toBe(2);
    expect(result).toEqual(new Uint8Array([0x12, 0x34])); // Big endian
  });

  it('should handle DataView input and preserve bytes in little-endian', () => {
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);
    view.setUint32(0, 0x12345678, true); // true for little-endian
    const input = view as unknown as Uint8Array;
    const result = ensureUint8Array(input);
    expect(result).toBeInstanceOf(Uint8Array);
    expect(result.byteLength).toBe(4);
    expect(result).toEqual(new Uint8Array([0x78, 0x56, 0x34, 0x12])); // Little endian
  });

  it('should handle DataView input and preserve bytes in big-endian', () => {
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);
    view.setUint32(0, 0x12345678, false); // false for big-endian
    const input = view as unknown as Uint8Array;
    const result = ensureUint8Array(input);
    expect(result).toBeInstanceOf(Uint8Array);
    expect(result.byteLength).toBe(4);
    expect(result).toEqual(new Uint8Array([0x12, 0x34, 0x56, 0x78])); // Big endian
  });

  it('handles TextEncoder output correctly in jsdom environment', () => {
    const encoded = new TextEncoder().encode('hello') as unknown as Uint8Array;
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
