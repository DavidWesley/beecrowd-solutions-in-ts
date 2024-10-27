import { readFileSync } from "node:fs"
import { EOL } from "node:os"
import { stdin } from "node:process"

const input = readFileSync(stdin.fd, { encoding: "utf8" }).split(EOL)

const toDec = (num: string, radixFrom: number): string => Number.parseInt(num, radixFrom).toString(10)
const toHex = (num: string, radixFrom = 10): string => "0x".concat(Number.parseInt(num, radixFrom).toString(16).toUpperCase())

const isStrictHex = (num: string): boolean => /^(0x)[A-F0-9]+$/i.test(num)

function main(): void {
  const output = []

  for (const num of input) {
    if (num.at(0) === "-") break
    output.push(isStrictHex(num) ? toDec(num, 16) : toHex(num, 10))
  }

  console.log(output.join(EOL))
}

main()
