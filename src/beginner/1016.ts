import { readFileSync } from "node:fs"
import { EOL } from "node:os"
import { stdin } from "node:process"

const input = readFileSync(stdin.fd, { encoding: "ascii" })
  .split(EOL, 1)
  .map((value) => Number.parseInt(value, 10))
  .at(0) as number

function calculateTimeInMinutesToReachGivenSpace(velocityA: number, velocityB: number, space: number): number {
  if (velocityA === velocityB) return Infinity

  const distanceTax = Math.abs(velocityA - velocityB) / 60
  return Math.round(space / distanceTax)
}

function main(): void {
  const VELOCITY_A_IN_KM_PER_H: number = 60
  const VELOCITY_B_IN_KM_PER_H: number = 90

  console.log(
    "%d minutos",
    calculateTimeInMinutesToReachGivenSpace(VELOCITY_A_IN_KM_PER_H, VELOCITY_B_IN_KM_PER_H, input)
  )
}

main()
