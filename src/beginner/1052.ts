import { readFileSync } from "node:fs"
import { EOL } from "node:os"
import { stdin } from "node:process"

const input = readFileSync(stdin.fd, { encoding: "utf8" })
  .split(EOL, 1)
  .map((value) => Number.parseInt(value, 10))
  .at(0) as number

function main(): void {
  console.log(
    new Date(2023, input % 12, 1).toLocaleDateString("en-us", { month: "long" })
  )
}

main()