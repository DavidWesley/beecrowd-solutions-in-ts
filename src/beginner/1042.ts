import { readFileSync } from "node:fs"
import { EOL } from "node:os"
import { stdin } from "node:process"

const input = readFileSync(stdin.fd, { encoding: "ascii" })
  .split(/\s+/, 3)
  .map(value => Number.parseInt(value, 10)) as [number, number, number]

function main(): void {
  const sorted = Array.from(input).sort((a, b) => a - b)
  console.log([...sorted, "", ...input].join(EOL))
}

main()