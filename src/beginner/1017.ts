import { readFileSync } from "node:fs"
import { EOL } from "node:os"
import { stdin } from "node:process"

const input = readFileSync(stdin.fd, { encoding: "ascii" })
  .split(EOL, 2)
  .map((value) => Number.parseInt(value, 10)) as [number, number]

function calculateTotalFuelConsumption(fuelYield: number, time: number, velocity: number): number {
  return (time * velocity) / fuelYield
}

function main(): void {
  const [time, velocity] = input
  const FUEL_YIELD_IN_KM_PER_L: number = 12
  console.log(calculateTotalFuelConsumption(FUEL_YIELD_IN_KM_PER_L, time, velocity).toFixed(3))
}

main()
