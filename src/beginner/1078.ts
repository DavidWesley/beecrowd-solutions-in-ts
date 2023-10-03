import { readFileSync } from "node:fs"
import { EOL } from "node:os"
import { stdin } from "node:process"

const input = readFileSync(stdin.fd, { encoding: "ascii" })
  .split(EOL, 1)
  .map((value) => Number.parseInt(value, 10))
  .at(0)!

function main(): void {
  const output = Array.from(
    { length: 10 },
    (_, i) => `${i + 1} x ${input} = ${input * (i + 1)}`
  )

  console.log(output.join(EOL))
}

main()