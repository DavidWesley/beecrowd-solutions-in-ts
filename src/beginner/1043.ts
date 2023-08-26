import { readFileSync } from "node:fs"
import { stdin } from "node:process"

const [A, B, C] = readFileSync(stdin.fd, { encoding: "ascii" })
  .split(/\s+/, 3)
  .map(Number.parseFloat) as [number, number, number]

const isNegative = (n: number | bigint): boolean => n < 0

const calculateTrianglePerimeter = (a: number, b: number, c: number): number => a + b + c
const calculateTrapezeArea = (b: number, B: number, h: number): number => ((B + b) * h) / 2

/**
 * Checks if the given sides can form a triangle.
 *
 * @param {number} a - the length of side A
 * @param {number} b - the length of side B
 * @param {number} c - the length of side C
 * @return {boolean} true if the sides can form a triangle, false otherwise
 */
function isTriangle(a: number, b: number, c: number): boolean {
  const sides = [a, b, c].sort((s1, s2) => s1 - s2) as [number, number, number]

  if (sides.includes(0)) return false
  if (sides.some(isNegative)) return false
  else if (sides[0] + sides[1] <= sides[2]) return false
  else return true
}

function main(): void {
  if (isTriangle(A, B, C)) {
    const perimeter: number = calculateTrianglePerimeter(A, B, C)
    console.log("Perimetro = %s", perimeter.toFixed(1))
  } else {
    const area: number = calculateTrapezeArea(A, B, C)
    console.log("Area = %s", area.toFixed(1))
  }
}

main()