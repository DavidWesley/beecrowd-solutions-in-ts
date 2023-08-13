import { readFileSync } from "node:fs"
import { stdin } from "node:process"

const [A, B, C, D] = readFileSync(stdin.fd, { encoding: "ascii" })
  .split(/\s+/, 4)
  .map((value) => Number.parseInt(value, 10)) as [number, number, number, number]

const isAcceptable = (a: number, b: number, c: number, d: number): boolean => {
  return (b > c) && (d > a) && (c + d > a + b) && (c > 0) && (d > 0) && (a % 2 == 0)
    ? true
    : false
}

function main(): void {
  console.log(isAcceptable(A, B, C, D) ? "Valores aceitos" : "Valores nao aceitos")
}

main()