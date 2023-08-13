import { readFileSync } from "node:fs"
import { EOL } from "node:os"
import { stdin } from "node:process"

const Float = (num: number | string, precision: number): number => {
  if (typeof num === "string") return Float(Number.parseFloat(num), precision)
  else return Number.parseFloat(num.toFixed(precision))
}

const [A, B, C] = readFileSync(stdin.fd, { encoding: "ascii" })
  .split(EOL, 3)
  .map((value) => Float(value, 1)) as [number, number, number]

function main(): void {
  const average: number = A * 0.2 + B * 0.3 + C * 0.5
  console.log("MEDIA = %s", average.toFixed(1))
}

main()
