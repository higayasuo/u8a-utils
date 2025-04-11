/**
 * Concatenates multiple Uint8Arrays into a single Uint8Array
 * @param arrays - Array of Uint8Arrays to concatenate
 * @returns A new Uint8Array containing all the concatenated data
 */
export const concatUint8Arrays = (...arrays: Uint8Array[]): Uint8Array => {
  const totalLength = arrays.reduce((acc, arr) => acc + arr.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;

  arrays.forEach((arr) => {
    result.set(arr, offset);
    offset += arr.length;
  });

  return result;
};
