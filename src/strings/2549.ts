import { readFileSync } from "node:fs"
import { EOL } from "node:os"
import { stdin } from "node:process"

const input = readFileSync(stdin.fd, { encoding: "utf8" })
  .split(EOL)
  .map((line) => line.trim())

const createStudentUsername = (name: string, year: number): string =>
  name
    .replace(/(\b\w)\w+/g, "$1")
    .replace(/\s+/g, "")
    .concat(year.toString())

function main(): void {
  const output: Array<number> = []

  for (let [i, N, A] = [0, 0, 0]; i < input.length; i += N + 1) {
    if (input[i] === "") break
    ;[N = 0, A = 0] = (input.at(i) ?? "0 0").split(" ", 2).map((value) => Number.parseInt(value, 10))

    const usernames: string[] = Array.from({ length: N }, (_, j: number) => createStudentUsername(input.at(i + 1 + j)!, A))
    const uniqueUsernames = new Set(usernames)
    const nonStandardNamesQuantity = usernames.length - uniqueUsernames.size
    output.push(nonStandardNamesQuantity)
  }

  console.log(output.join(EOL))
}

main()
