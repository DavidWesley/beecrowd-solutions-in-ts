import { readFileSync } from "node:fs"
import { EOL } from "node:os"
import { stdin } from "node:process"

const input = readFileSync(stdin.fd, { encoding: "utf8" })
  .split(EOL, 2)
  .map((line) => line.split(" ").map((value) => Number.parseInt(value, 10))) as [number, number[]]

function main(): void {
  let hasAlternatingPattern = true

  for (let [index, previousState] = [1, ""]; index < input[0]; index += 1) {
    const previousValue = input[1][index - 1]!
    const currentValue = input[1][index]!

    if (currentValue === previousValue) {
      hasAlternatingPattern = false
      break
    }

    const currentState = currentValue - previousValue > 0 && currentValue !== previousValue ? "peak" : "valley"

    if (currentState === previousState) {
      hasAlternatingPattern = false
      break
    }

    previousState = currentState
  }

  console.log(hasAlternatingPattern === true ? 1 : 0)
}

main()
