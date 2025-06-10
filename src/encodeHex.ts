/**
 * Converts a Uint8Array to a hexadecimal string.
 *
 * @param value - The Uint8Array to convert.
 * @returns A string representing the hexadecimal value of the input Uint8Array.
 */
export const encodeHex = (value: Uint8Array) => {
  return Array.from(value)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
};

/**
 * @deprecated ⚠️ DEPRECATED: Use encodeHex instead ⚠️
 */
export const toHex = (value: Uint8Array) => {
  return encodeHex(value);
};
