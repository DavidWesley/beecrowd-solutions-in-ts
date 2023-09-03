/**
 * Converts a number or string to a floating-point number with the specified precision.
 *
 * @param {number | string} num - The number or string to convert.
 * @param {number} precision - The number of digits to appear after the decimal point.
 * @return {number} - The floating-point number with the specified precision.
 */
export const Float = (num: number | string, precision: number): number => {
  if (typeof num === "string") return Float(Number.parseFloat(num), precision)
  else return Number.parseFloat(num.toFixed(precision))
}