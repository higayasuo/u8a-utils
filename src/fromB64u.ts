import { toByteArray } from 'base64-js';

/**
 * Converts a URL-safe Base64 string to a Uint8Array.
 *
 * This function first converts the URL-safe Base64 string to a standard Base64 string
 * by replacing '-' with '+' and '_' with '/', then adds padding if necessary,
 * and finally decodes it to a Uint8Array.
 *
 * @param {string} b64u - The URL-safe Base64 string to convert
 * @returns {Uint8Array} The decoded Uint8Array
 */
export const fromB64u = (b64u: string) => {
  const base64 = b64u.replace(/-/g, '+').replace(/_/g, '/');
  const padding = base64.length % 4;
  const padded = padding ? base64 + '='.repeat(4 - padding) : base64;
  return toByteArray(padded);
};
