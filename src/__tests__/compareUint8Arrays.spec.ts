import { describe, it, expect } from 'vitest';
import { compareUint8Arrays } from '../compareUint8Arrays';

describe('uint8ArrayUtils', () => {
  describe('compareUint8Arrays', () => {
    it('should return true for identical arrays', () => {
      const a = new Uint8Array([1, 2, 3, 4]);
      const b = new Uint8Array([1, 2, 3, 4]);
      expect(compareUint8Arrays(a, b)).toBe(true);
    });

    it('should return false for arrays with different lengths', () => {
      const a = new Uint8Array([1, 2, 3]);
      const b = new Uint8Array([1, 2, 3, 4]);
      expect(compareUint8Arrays(a, b)).toBe(false);
    });

    it('should return false for arrays with different values', () => {
      const a = new Uint8Array([1, 2, 3, 4]);
      const b = new Uint8Array([1, 2, 3, 5]);
      expect(compareUint8Arrays(a, b)).toBe(false);
    });

    it('should return true for empty arrays', () => {
      const a = new Uint8Array([]);
      const b = new Uint8Array([]);
      expect(compareUint8Arrays(a, b)).toBe(true);
    });

    it('should return true for arrays with all zeros', () => {
      const a = new Uint8Array([0, 0, 0, 0]);
      const b = new Uint8Array([0, 0, 0, 0]);
      expect(compareUint8Arrays(a, b)).toBe(true);
    });

    it('should return true for arrays with maximum values', () => {
      const a = new Uint8Array([255, 255, 255, 255]);
      const b = new Uint8Array([255, 255, 255, 255]);
      expect(compareUint8Arrays(a, b)).toBe(true);
    });
  });
});
