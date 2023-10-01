import { readFileSync } from "node:fs"
import { EOL } from "node:os"
import { stdin } from "node:process"

const input = readFileSync(stdin.fd, { encoding: "ascii" })
  .split(EOL, 1)
  .map((value) => Number.parseInt(value, 10))
  .at(0)!

function main(): void {
  const output = []

  for (let n = 2; n <= input; n += 2)
    output.push(`${n}^2 = ${n ** 2}`)

  console.log(output.join(EOL))
}

main()
