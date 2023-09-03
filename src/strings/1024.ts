import { readFileSync } from "node:fs"
import { EOL } from "node:os"
import { stdin } from "node:process"

type operator<T> = (value: T) => T

const [N, ...input] = readFileSync(stdin.fd, { encoding: "utf8" }).split(EOL, 1e4 + 1) as [string, ...Array<string>]

/**
 * Applies a series of operators to a value in a pipeline.
 *
 * @param {Array<operator<T>>} operators - An array of operators to apply to the value.
 * @returns {operator<T>} - A combined functions which apply all the operators to the value.
 */
const pipe =
  <T>(...operators: Array<operator<T>>): operator<T> =>
    (value: T) =>
      operators.reduce((res, fn) => fn(res), value)

/**
 * Replaces all alphabetic characters in the given text with the character that is three positions
 * ahead in the ASCII table.
 *
 * @param {string} text The text to be encrypted.
 * @return {string} The encrypted text.
 */
const encryptTextWithCaesarThree = (text: string): string => {
  return text.replace(/[a-zA-Z]/g, (char: string) => String.fromCharCode(char.charCodeAt(0) + 3))
}

/**
 * Reverses the characters in a given string.
 *
 * @param {string} text The string to be reversed.
 * @returns {string} The reversed string.
 */
const reverseText = (text: string): string => {
  return Array.from(text).reverse().join("")
}

/**
 * Encrypts the given text by splitting it into two parts,
 * replacing each character in the second part with the previous character code,
 * and then concatenating the two parts together.
 *
 * @param {string} text The text to be encrypted.
 * @returns {string} The encrypted text.
 */
const encryptTextWithSplitShiftOne = (text: string): string => {
  const limit = Math.trunc(text.length / 2)
  const originalText = text.substr(0, limit)
  const processedText = text.substr(limit).replace(/./g, (char: string) => String.fromCharCode(char.charCodeAt(0) - 1))

  return originalText.concat(processedText)
}

function main(): void {
  const output = input
    .slice(0, Number.parseInt(N, 10))
    .map(pipe(encryptTextWithCaesarThree, reverseText, encryptTextWithSplitShiftOne))

  console.log(output.join(EOL))
}

main()
