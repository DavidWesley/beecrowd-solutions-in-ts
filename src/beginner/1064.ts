import { readFileSync } from "node:fs"
import { EOL } from "node:os"
import { stdin } from "node:process"

const input = readFileSync(stdin.fd, { encoding: "ascii" })
  .split(EOL, 6)
  .map(Number) as [number, number, number, number, number, number]

const isPositive = (value: number): boolean => value > 0

function main(): void {
  const positiveNumbers = input.filter(isPositive)
  const positiveNumbersAverage = positiveNumbers.reduce((sum, value) => sum + value, 0) / positiveNumbers.length

  const output = [`${positiveNumbers.length} valores positivos`, positiveNumbersAverage.toFixed(1)]

  console.log(output.join(EOL))
}

main()
