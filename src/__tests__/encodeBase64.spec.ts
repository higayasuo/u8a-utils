import { describe, it, expect } from 'vitest';
import { encodeBase64 } from '../encodeBase64';

describe('encodeBase64', () => {
  it('should convert Uint8Array to valid Base64 string', () => {
    const bytes = new Uint8Array([72, 101, 108, 108, 111]); // "Hello"
    const result = encodeBase64(bytes);
    expect(result).toBe('SGVsbG8=');
  });

  it('should handle empty Uint8Array', () => {
    const bytes = new Uint8Array(0);
    const result = encodeBase64(bytes);
    expect(result).toBe('');
  });

  it('should handle Uint8Array with multiple bytes', () => {
    const bytes = new Uint8Array([0, 1, 2, 3, 4, 5]);
    const result = encodeBase64(bytes);
    expect(result).toBe('AAECAwQF');
  });
});
