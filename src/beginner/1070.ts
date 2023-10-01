import { readFileSync } from "node:fs"
import { EOL } from "node:os"
import { stdin } from "node:process"

const input = readFileSync(stdin.fd, { encoding: "ascii" })
  .split(EOL, 1)
  .map((value) => Number.parseInt(value, 10))
  .at(0)!

const isOdd = (value: number): boolean => value % 2 === 1

function main(): void {
  const output = []

  const LIMIT = 6
  const START = isOdd(input) ? input : input + 1

  for (let l = 0; l < LIMIT; l += 1)
    output.push(START + l * 2)

  console.log(output.join(EOL))
}

main()
