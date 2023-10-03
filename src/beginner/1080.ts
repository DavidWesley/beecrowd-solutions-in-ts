import { readFileSync } from "node:fs"
import { EOL } from "node:os"
import { stdin } from "node:process"

const input = readFileSync(stdin.fd, { encoding: "ascii" })
  .split(EOL, 100)
  .map((value) => Number.parseInt(value, 10)) as Array<number>

function main(): void {
  const maxValue = Math.max.apply(null, input)
  const maxValuePosition = 1 + input.indexOf(maxValue)
  const output = [maxValue, maxValuePosition]

  console.log(output.join(EOL))
}

main()
