import { describe, it, expect } from 'vitest';
import { uint32BE } from '../uint32BE';

describe('uint32BE', () => {
  it('converts 0 to Uint8Array', () => {
    expect(uint32BE(0)).toEqual(new Uint8Array([0, 0, 0, 0]));
  });

  it('converts 1 to Uint8Array', () => {
    expect(uint32BE(1)).toEqual(new Uint8Array([0, 0, 0, 1]));
  });

  it('converts 0x12345678 to Uint8Array', () => {
    expect(uint32BE(0x12345678)).toEqual(
      new Uint8Array([0x12, 0x34, 0x56, 0x78]),
    );
  });

  it('converts 0xffffffff to Uint8Array', () => {
    expect(uint32BE(0xffffffff)).toEqual(
      new Uint8Array([0xff, 0xff, 0xff, 0xff]),
    );
  });

  it('throws for negative numbers', () => {
    expect(() => uint32BE(-1)).toThrow();
  });

  it('throws for numbers greater than 0xffffffff', () => {
    expect(() => uint32BE(0x1_0000_0000)).toThrow();
  });
});
