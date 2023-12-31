import { readFileSync } from "node:fs"
import { EOL } from "node:os"
import { stdin } from "node:process"

const input = readFileSync(stdin.fd, { encoding: "ascii" })
  .split(EOL, 5)
  .map((value) => Number.parseInt(value, 10)) as [number, number, number, number, number]

/**
 * A higher-order function that takes a predicate function and returns a new function.
 * The returned function takes an arbitrary number of values and counts how many of them
 * satisfy the predicate function.
 *
 * @param {function} fn - The predicate function used to determine if a value satisfies a condition.
 * @return {function} A function that takes an arrays of numbers and returns the count of values that satisfy the predicate function.
 */
const counter = <T>(fn: (arg0: T) => boolean) => {
  return (values: Array<T>): number => {
    let count = 0
    for (const value of values) if (fn(value)) count += 1
    return count
  }
}

const isEven = (value: number): boolean => Math.abs(value % 2) === 0
const evenNumbersCounter = counter(isEven)

function main(): void {
  console.log("%d valores pares", evenNumbersCounter(input))
}

main()
