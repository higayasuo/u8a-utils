import { encodeBase64 } from './encodeBase64';

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
export const encodeBase64Url = (u8a: Uint8Array) => {
  return encodeBase64(u8a)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

/**
 * @deprecated ⚠️ DEPRECATED: Use encodeBase64Url instead ⚠️
 */
export const toB64U = (u8a: Uint8Array) => {
  return encodeBase64Url(u8a);
};
