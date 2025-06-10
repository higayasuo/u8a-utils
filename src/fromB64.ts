/**
 * Converts a standard Base64 string to a Uint8Array.
 * This function strictly follows the Base64 specification.
 *
 * @param {string} b64 - The Base64 string to convert
 * @returns {Uint8Array} The decoded Uint8Array
 * @throws {Error} If the input contains invalid Base64 characters or has invalid padding
 */
export const fromB64 = (b64: string): Uint8Array => {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
};
