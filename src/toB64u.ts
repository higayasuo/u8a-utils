import { toB64 } from './toB64';

/**
 * Converts a Uint8Array to a URL-safe Base64 string.
 *
 * This function first converts the Uint8Array to a standard Base64 string,
 * then replaces '+' with '-', '/' with '_', and removes trailing '=' characters
 * to make it URL-safe.
 *
 * @param {Uint8Array} u8a - The Uint8Array to convert
 * @returns {string} A URL-safe Base64 encoded string
 */
export const toB64U = (u8a: Uint8Array) => {
  return toB64(u8a).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};
