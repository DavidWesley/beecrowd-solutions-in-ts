import { readFileSync } from "node:fs"
import { stdin } from "node:process"

const [A, B] = readFileSync(stdin.fd, { encoding: "ascii" })
  .split(/\s+/, 2)
  .map(Number.parseFloat) as [number, number]

function quadrants(x: number, y: number) {
  switch (true) {
    case x === 0 && y === 0: return "Origem"
    case x === 0: return "Eixo Y"
    case y === 0: return "Eixo X"
    case y > 0: return x > 0 ? "Q1" : "Q2"
    case y < 0: return x < 0 ? "Q3" : "Q4"
    default: return ""
  }
}

function main(): void {
  console.log(quadrants(A, B))
}

main()
