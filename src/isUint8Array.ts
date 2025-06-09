/**
 * Checks if a value is a Uint8Array.
 *
 * This function handles both standard Uint8Array instances and Uint8Array-like objects
 * that might be returned by certain APIs (e.g., Node.js TextEncoder).
 *
 * @param {unknown} a - The value to check
 * @returns {boolean} True if the value is a Uint8Array, false otherwise
 * @example
 * // Returns true
 * isUint8Array(new Uint8Array([1, 2, 3]));
 * @example
 * // Returns true for Uint8Array-like objects
 * const encoded = new TextEncoder().encode('hello');
 * isUint8Array(encoded);
 * @example
 * // Returns false
 * isUint8Array([1, 2, 3]);
 */
export const isUint8Array = (a: unknown): a is Uint8Array => {
  return (
    a instanceof Uint8Array ||
    (ArrayBuffer.isView(a) && a.constructor.name === 'Uint8Array')
  );
};
