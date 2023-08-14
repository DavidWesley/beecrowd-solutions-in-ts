import { readFileSync } from "node:fs"
import { stdin } from "node:process"

const [A, B, C] = readFileSync(stdin.fd, { encoding: "ascii" })
  .split(/\s+/, 3)
  .map(Number.parseFloat) as [number, number, number]

function quadraticRoots(a: number, b: number, c: number): [number, number] | null {
  const discriminant = Math.pow(b, 2) - 4 * a * c
  if (discriminant < 0 || a === 0) return null
  const root1 = (-b + Math.sqrt(discriminant)) / (2 * a)
  const root2 = (-b - Math.sqrt(discriminant)) / (2 * a)
  return [root1, root2]
}

function main(): void {
  const roots = quadraticRoots(A, B, C)

  if (roots === null)
    console.log("Impossivel calcular")
  else {
    console.log("R1 = %s", roots[0].toFixed(5))
    console.log("R2 = %s", roots[1].toFixed(5))
  }
}

main()
