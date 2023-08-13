import { readFileSync } from "node:fs"
import { EOL } from "node:os"
import { stdin } from "node:process"

const [X, Y] = readFileSync(stdin.fd, { encoding: "ascii" })
  .split(EOL, 2)
  .map(Number.parseFloat) as [number, number]

const calculateFuelYield = (distance: number, consumption: number) => {
  return distance / consumption
}

function main(): void {
  console.log("%s km/l", calculateFuelYield(X, Y).toFixed(3))
}

main()
