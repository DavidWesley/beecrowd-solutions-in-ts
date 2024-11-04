import { readFileSync } from "node:fs"
import { EOL } from "node:os"
import { stdin } from "node:process"

const input = readFileSync(stdin.fd, { encoding: "utf8" }).split(EOL).map(Number.parseFloat)

const calcGridRegionArea = (r: number): number => {
  return Math.pow(r, 2) * (4 - Math.sqrt(3) - (2 * Math.PI) / 3)
}

const calcStripedRegionArea = (r: number): number => {
  return Math.pow(r, 2) * (1 - Math.sqrt(3) + Math.PI / 3)
}

const calcDottedRegionArea = (r: number): number => {
  return Math.pow(r, 2) * (-4 + 2 * Math.sqrt(3) + Math.PI / 3)
}

function main(): void {
  const output: string[] = []

  for (const R of input) {
    if (Number.isNaN(R)) break
    output.push([calcStripedRegionArea(R), calcDottedRegionArea(R), calcGridRegionArea(R)].map((area) => area.toFixed(3)).join(" "))
  }

  console.log(output.join(EOL))
}

main()
