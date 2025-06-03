# u8a-utils

A collection of utility functions for working with Uint8Arrays in TypeScript.

## Installation

```bash
npm install u8a-utils
```

## Usage

```typescript
import {
  concatUint8Arrays,
  compareUint8Arrays,
  uint64BE,
  uint32BE,
  writeUInt32BE,
  fromHex,
  toHex,
  toB64u,
  fromB64u,
} from 'u8a-utils';

// Concatenate multiple Uint8Arrays
const arr1 = new Uint8Array([1, 2, 3]);
const arr2 = new Uint8Array([4, 5, 6]);
const result = concatUint8Arrays(arr1, arr2);
// result: Uint8Array [1, 2, 3, 4, 5, 6]

// You can also use the spread operator with an array
const arrays = [arr1, arr2];
const result2 = concatUint8Arrays(...arrays);
// result2: Uint8Array [1, 2, 3, 4, 5, 6]

// Compare two Uint8Arrays
const isEqual = compareUint8Arrays(arr1, arr2);
// isEqual: false
const isEqual2 = compareUint8Arrays(arr1, new Uint8Array([1, 2, 3]));
// isEqual2: true

// Convert a number to a 64-bit Uint8Array in big-endian format (safe value)
const uint64Value = uint64BE(0x12345678);
// uint64Value: Uint8Array [0x00, 0x00, 0x00, 0x00, 0x12, 0x34, 0x56, 0x78]

// Convert a number to a 32-bit Uint8Array in big-endian format
const uint32Value = uint32BE(0x12345678);
// uint32Value: Uint8Array [0x12, 0x34, 0x56, 0x78]

// Write a 32-bit unsigned integer to a Uint8Array in big-endian format
const buf = new Uint8Array(4);
writeUInt32BE(buf, 0x12345678);
// buf: Uint8Array [0x12, 0x34, 0x56, 0x78]

// Convert Uint8Array to hexadecimal string
const hex = toHex(new Uint8Array([0x0a, 0x1b, 0x2c]));
// hex: "0a1b2c"

// Convert hexadecimal string to Uint8Array
const bytes = fromHex('0a1b2c');
// bytes: Uint8Array [10, 27, 44]

// Convert Uint8Array to URL-safe Base64 string
const b64u = toB64u(new Uint8Array([1, 2, 3, 4]));
// b64u: "AQIDBA"

// Convert URL-safe Base64 string to Uint8Array
const bytes2 = fromB64u('AQIDBA');
// bytes2: Uint8Array [1, 2, 3, 4]
```

## API

### concatUint8Arrays(...arrays: Uint8Array[]): Uint8Array

Concatenates multiple Uint8Arrays into a single Uint8Array.

#### Parameters

- `...arrays`: Variable number of Uint8Arrays to concatenate

#### Returns

A new Uint8Array containing all the concatenated data

### compareUint8Arrays(a: Uint8Array, b: Uint8Array): boolean

Compares two Uint8Arrays for equality.

#### Parameters

- `a`: First Uint8Array to compare
- `b`: Second Uint8Array to compare

#### Returns

`true` if the arrays are equal (same length and values), `false` otherwise

### uint64BE(value: number): Uint8Array

Converts a 64-bit unsigned integer to a Uint8Array in big-endian format.

#### Parameters

- `value`: The 64-bit unsigned integer to convert

#### Returns

A Uint8Array containing the 64-bit value in big-endian format

### uint32BE(value: number): Uint8Array

Converts a 32-bit unsigned integer to a Uint8Array in big-endian format.

#### Parameters

- `value`: The 32-bit unsigned integer to convert

#### Returns

A Uint8Array containing the 32-bit value in big-endian format

#### Throws

- `RangeError` if the value is not in the range [0, 0xffffffff]

### writeUInt32BE(u8array: Uint8Array, value: number, offset?: number): void

Writes a 32-bit unsigned integer to a Uint8Array in big-endian format.

#### Parameters

- `u8array`: The Uint8Array to write to
- `value`: The 32-bit unsigned integer to write
- `offset`: The offset in the Uint8Array to start writing at (default: 0)

#### Throws

- `RangeError` if the value is not in the range [0, MAX_INT32 - 1]

### toHex(value: Uint8Array): string

Converts a Uint8Array to a hexadecimal string.

#### Parameters

- `value`: The Uint8Array to convert

#### Returns

A string representing the hexadecimal value of the input Uint8Array

### fromHex(value: string): Uint8Array

Converts a hexadecimal string to a Uint8Array.

#### Parameters

- `value`: The hexadecimal string to convert

#### Returns

A Uint8Array representing the value of the input hexadecimal string

#### Throws

- `Error` if the input string is not a valid hexadecimal string

### toB64u(value: Uint8Array): string

Converts a Uint8Array to a URL-safe Base64 string.

#### Parameters

- `value`: The Uint8Array to convert

#### Returns

A URL-safe Base64 string (using '-' and '\_' instead of '+' and '/', and without padding)

### fromB64u(value: string): Uint8Array

Converts a URL-safe Base64 string to a Uint8Array.

#### Parameters

- `value`: The URL-safe Base64 string to convert

#### Returns

A Uint8Array representing the value of the input URL-safe Base64 string

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build the package
npm run build
```

## License

ISC
