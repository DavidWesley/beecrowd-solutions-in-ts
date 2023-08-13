import { readFileSync } from "node:fs"
import { EOL } from "node:os"
import { stdin } from "node:process"

const Float = (num: number | string, precision: number): number => {
  if (typeof num === "string") return Float(Number.parseFloat(num), precision)
  else return Number.parseFloat(num.toFixed(precision))
}

const input = readFileSync(stdin.fd, { encoding: "ascii" })
  .split(EOL, 3)
  .map((value) => Float(value, 2)) as [number, number, number]

function calculateSalary(workedHours: number, tax: number): number {
  return tax * workedHours
}

function main(): void {
  const [employees, timeWorkedInHours, tax] = input

  console.log("NUMBER = %s", employees.toFixed(0))
  console.log("SALARY = U$ %s", calculateSalary(timeWorkedInHours, tax).toFixed(2))
}

main()
