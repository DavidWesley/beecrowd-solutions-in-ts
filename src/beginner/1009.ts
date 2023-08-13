import { readFileSync } from "node:fs"
import { EOL } from "node:os"
import { stdin } from "node:process"

const input = readFileSync(stdin.fd, { encoding: "ascii" }).split(EOL, 3) as [string, string, string]

const Float = (num: number | string, precision: number): number => {
  if (typeof num === "string") return Float(Number.parseFloat(num), precision)
  else return Number.parseFloat(num.toFixed(precision))
}

type Seller = {
  name: string
  fixedSalary: number
  totalSales: number
}

function calculateSellerSalaryWithBonus(seller: Seller): number {
  const commission: number = seller.totalSales * 0.15
  return seller.fixedSalary + commission
}

function main(): void {
  const seller: Seller = {
    name: input[0],
    fixedSalary: Float(input[1], 2),
    totalSales: Float(input[2], 2),
  }

  console.log("TOTAL = R$ %s", calculateSellerSalaryWithBonus(seller).toFixed(2))
}

main()
