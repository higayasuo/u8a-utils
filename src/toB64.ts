/**
 * Converts a Uint8Array to a standard Base64 string.
 * This function strictly follows the Base64 specification.
 *
 * @param {Uint8Array} input - The Uint8Array to convert
 * @returns {string} The Base64 encoded string
 */
export const toB64 = (input: Uint8Array): string => {
  const CHUNK_SIZE = 0x8000;
  const arr = [];

  for (let i = 0; i < input.length; i += CHUNK_SIZE) {
    const chunk = input.subarray(i, i + CHUNK_SIZE) as unknown as number[];
    arr.push(String.fromCharCode.apply(null, chunk));
  }

  return btoa(arr.join(''));
};
