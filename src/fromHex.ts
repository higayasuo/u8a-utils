/**
 * Converts a hexadecimal string to a Uint8Array.
 *
 * @param value - The hexadecimal string to convert.
 * @returns A Uint8Array representing the value of the input hexadecimal string.
 * @throws {Error} If the input string is not a valid hexadecimal string.
 */
export const fromHex = (value: string): Uint8Array => {
  // Remove whitespace
  const cleaned = value.replace(/\s/g, '');
  // Ensure even length
  const normalized = cleaned.padStart(Math.ceil(cleaned.length / 2) * 2, '0');

  // Validate hex string
  if (!/^[0-9a-fA-F]*$/.test(normalized)) {
    throw new Error(`Invalid hexadecimal string: "${value}"`);
  }

  // Convert to Uint8Array
  const bytes = normalized.match(/.{2}/g);

  if (!bytes) {
    return new Uint8Array();
  }

  return new Uint8Array(bytes.map((byte) => parseInt(byte, 16)));
};
