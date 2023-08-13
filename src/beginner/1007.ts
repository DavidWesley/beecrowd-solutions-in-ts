import { readFileSync } from "node:fs"
import { EOL } from "node:os"
import { stdin } from "node:process"

const [A, B, C, D] = readFileSync(stdin.fd, { encoding: "ascii" })
  .split(EOL, 4)
  .map((value) => Number.parseInt(value, 10)) as [number, number, number, number]

function main(): void {
  const difference: number = A * B - C * D
  console.log("DIFERENCA = %d", difference)
}

main()
