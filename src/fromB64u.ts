import { fromB64 } from './fromB64';

/**
 * Converts a URL-safe Base64 string to a Uint8Array.
 *
 * This function first converts the URL-safe Base64 string to a standard Base64 string
 * by replacing '-' with '+' and '_' with '/', then adds padding if necessary,
 * and finally decodes it to a Uint8Array.
 *
 * @param {string} b64u - The URL-safe Base64 string to convert
 * @returns {Uint8Array} The decoded Uint8Array
 * @throws {Error} If the input contains invalid Base64 characters or has invalid padding
 */
export const fromB64U = (b64u: string): Uint8Array => {
  const b64 = b64u.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '');
  return fromB64(b64);
};
