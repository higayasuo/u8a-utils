/**
 * Ensures the input value is a Uint8Array.
 *
 * This function is particularly useful when dealing with Uint8Array-like objects
 * that might be returned by certain APIs (e.g., TextEncoder in jsdom environment).
 * It uses {@link isUint8Array} to check if the input is a Uint8Array or Uint8Array-like object.
 *
 * If the input is already a Uint8Array or Uint8Array-like object, it is converted to a proper Uint8Array.
 * If the input is an ArrayLike<number>, it is converted to a Uint8Array.
 *
 * @param {Uint8Array | ArrayLike<number>} value - The input value to ensure as Uint8Array
 * @returns {Uint8Array} The ensured Uint8Array
 * @example
 * // Returns Uint8Array [1, 2, 3]
 * ensureUint8Array(new Uint8Array([1, 2, 3]));
 * @example
 * // Returns Uint8Array [4, 5, 6]
 * ensureUint8Array([4, 5, 6]);
 * @example
 * // TextEncoder in jsdom environment returns a Uint8Array-like object
 * const encoded = new TextEncoder().encode('hello');
 * console.log(encoded instanceof Uint8Array); // false
 * const ensured = ensureUint8Array(encoded);
 * console.log(ensured instanceof Uint8Array); // true
 */
export const ensureUint8Array = (value: Uint8Array): Uint8Array => {
  if (value instanceof Uint8Array) {
    return value;
  }

  if (ArrayBuffer.isView(value)) {
    const view = value as ArrayBufferView;
    return new Uint8Array(view.buffer, view.byteOffset, view.byteLength);
  }

  return Uint8Array.from(value);
};
