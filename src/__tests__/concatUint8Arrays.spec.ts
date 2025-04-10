import { describe, it, expect } from 'vitest';
import { concatUint8Arrays } from '../concatUint8Arrays';

describe('concatUint8Arrays', () => {
  it('should concatenate multiple Uint8Arrays into a single array', () => {
    const arr1 = new Uint8Array([1, 2, 3]);
    const arr2 = new Uint8Array([4, 5, 6]);
    const arr3 = new Uint8Array([7, 8, 9]);

    const result = concatUint8Arrays([arr1, arr2, arr3]);

    expect(result).toEqual(new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9]));
    expect(result.length).toBe(9);
  });

  it('should handle empty arrays', () => {
    const result = concatUint8Arrays([]);
    expect(result).toEqual(new Uint8Array(0));
    expect(result.length).toBe(0);
  });

  it('should handle single array', () => {
    const arr = new Uint8Array([1, 2, 3]);
    const result = concatUint8Arrays([arr]);
    expect(result).toEqual(arr);
    expect(result.length).toBe(3);
  });
});