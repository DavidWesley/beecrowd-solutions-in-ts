import { readFileSync } from "node:fs"
import { EOL } from "node:os"
import { stdin } from "node:process"

const [A, B] = readFileSync(stdin.fd, { encoding: "ascii" })
  .split(EOL, 2)
  .map((value) => Number.parseInt(value, 10)) as [number, number]

function main(): void {
  console.log("X = %d", A + B)
}

main()
