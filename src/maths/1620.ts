import { readFileSync } from "node:fs"
import { EOL } from "node:os"
import { stdin } from "node:process"

const input = readFileSync(stdin.fd, { encoding: "utf8" })
  .split(EOL)
  .map((line) => line.replace(/e(\d+)$/i, (_, pow) => "0".repeat(Number.parseInt(pow, 10))))
  .map(BigInt)

function main() {
  const output = []

  for (const L of input) {
    if (L === BigInt(0)) break

    const I = L + L - BigInt(3)
    const result = Number(((I - L) * BigInt(1e9)) / L)
    output.push((result / 1e9).toFixed(6))
  }

  console.log(output.join(EOL))
}

main()
