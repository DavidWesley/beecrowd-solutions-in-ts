import { readFileSync } from "node:fs"
import { EOL } from "node:os"
import { stdin } from "node:process"

const Float = (num: number | string, precision: number): number => {
  if (typeof num === "string") return Float(Number.parseFloat(num), precision)
  else return Number.parseFloat(num.toFixed(precision))
}

const calculateCircleArea = (radius: number, pi: number = Math.PI): number => {
  return pi * Math.pow(radius, 2)
}

const input = readFileSync(stdin.fd, { encoding: "ascii" })
  .split(EOL, 1)
  .map(Number.parseFloat)
  .map((radius) => Float(radius, 2))
  .at(0) as number

function main(): void {
  console.log("A=%s", calculateCircleArea(input, Float(Math.PI, 5)).toFixed(4))
}

main()
