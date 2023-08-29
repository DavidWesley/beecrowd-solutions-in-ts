import { readFileSync } from "node:fs"
import { EOL } from "node:os"
import { stdin } from "node:process"

const input = readFileSync(stdin.fd, { encoding: "utf8" })
  .split(EOL, 1)
  .map(Number.parseFloat)
  .at(0) as number

function calculateIncomeTax(income: number): number {
  switch (true) {
    case income <= 2000: return 0
    case income <= 3000: return 0.08 * (income - 2000) + calculateIncomeTax(2000)
    case income <= 4500: return 0.18 * (income - 3000) + calculateIncomeTax(3000)
    case income > 4500: return 0.28 * (income - 4500) + calculateIncomeTax(4500)
    default: return 0
  }
}

function main(): void {
  const tax = calculateIncomeTax(input)
  console.log(tax > 0 ? `R$ ${tax.toFixed(2)}` : "Isento")
}

main()