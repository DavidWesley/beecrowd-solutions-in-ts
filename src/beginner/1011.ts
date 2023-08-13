import { readFileSync } from "node:fs"
import { EOL } from "node:os"
import { stdin } from "node:process"

const input = readFileSync(stdin.fd, { encoding: "ascii" })
  .split(EOL, 1)
  .map(Number.parseFloat)
  .at(0) as number

const Float = (num: number | string, precision: number): number => {
  if (typeof num === "string") return Float(Number.parseFloat(num), precision)
  else return Number.parseFloat(num.toFixed(precision))
}

const calculateSphereVolumeFromRadius = (radius: number, pi: number = Math.PI): number => {
  return pi * (4 / 3) * Math.pow(radius, 3)
}

function main(): void {
  const volume: number = calculateSphereVolumeFromRadius(input, Float(Math.PI, 5))
  console.log("VOLUME = %s", volume.toFixed(3))
}

main()
