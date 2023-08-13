import { readFileSync } from "node:fs"
import { EOL } from "node:os"
import { stdin } from "node:process"

const Float = (num: number | string, precision: number): number => {
  if (typeof num === "string") return Float(Number.parseFloat(num), precision)
  else return Number.parseFloat(num.toFixed(precision))
}

const [A, B] = readFileSync(stdin.fd, { encoding: "ascii" })
  .split(EOL, 2)
  .map((value) => Float(value, 1)) as [number, number]

function main(): void {
  const average: number = ((A * 0.35 + B * 0.75) * 10) / 11
  console.log("MEDIA = %s", average.toFixed(5))
}

main()
