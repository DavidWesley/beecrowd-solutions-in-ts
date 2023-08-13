import { readFileSync } from "node:fs"
import { EOL } from "node:os"
import { stdin } from "node:process"

const Float = (num: number | string, precision: number): number => {
  if (typeof num === "string") return Float(Number.parseFloat(num), precision)
  else return Number.parseFloat(num.toFixed(precision))
}

const input = readFileSync(stdin.fd, { encoding: "ascii" })
  .split(EOL, 2)
  .map((line) => line.split(/\s+/, 3).map((value) => Float(value, 2))) as Array<[number, number, number]>

function main(): void {
  const total: number = input
    .map(([code, quantity, price]) => ({ code, quantity, price }))
    .reduce((sum, part) => sum + part.price * part.quantity, 0)

  console.log("VALOR A PAGAR: R$ %s", total.toFixed(2))
}

main()
