import { readFileSync } from "node:fs"
import { stdin } from "node:process"

const [A, B] = readFileSync(stdin.fd, { encoding: "ascii" })
  .split(/\s+/, 2)
  .map((value) => Number.parseInt(value, 10)) as [number, number]

function main(): void {
  console.log(
    A % B === 0 || B % A === 0
      ? "Sao Multiplos"
      : "Nao sao Multiplos"
  )
}

main()