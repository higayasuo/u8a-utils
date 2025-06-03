# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.6] - 2025-06-03

### Added

- Added `uint32BE`: Converts a 32-bit unsigned integer to a Uint8Array in big-endian format

## [1.0.5] - 2025-06-03

### Added

- Added `fromB64u` and `toB64u` utility functions to the main exports

## [1.0.4] - 2025-06-03

### Added

- `toB64u`: Converts a Uint8Array to a URL-safe Base64 string
- `fromB64u`: Converts a URL-safe Base64 string to a Uint8Array

## [1.0.3] - 2025-05-09

### Added

- Added `fromHex` and `toHex` utility functions to the main exports

## [1.0.2] - 2025-05-09

### Added

- `toHex`: Converts a Uint8Array to a hexadecimal string
- `fromHex`: Converts a hexadecimal string to a Uint8Array with support for odd-length strings and whitespace

## [1.0.1] - 2025-04-11

### Added

- Initial release with basic Uint8Array utility functions
- Added TypeScript support
- Added Vitest for testing
- Added Vite for building

## [1.0.0] - 2025-04-10

### Added

- Initial release
- `concatUint8Arrays`: Concatenates multiple Uint8Arrays into a single Uint8Array
- `compareUint8Arrays`: Compares two Uint8Arrays for equality
- `uint64BE`: Converts a 64-bit unsigned integer to a Uint8Array in big-endian format
- `writeUInt32BE`: Writes a 32-bit unsigned integer to a Uint8Array in big-endian format
