import { readFileSync } from "node:fs"
import { stdin } from "node:process"

const [A, B, C] = readFileSync(stdin.fd, { encoding: "ascii" })
  .split(/\s+/, 3)
  .map(Number.parseFloat) as [number, number, number]

const Float = (num: number | string, precision: number): number => {
  if (typeof num === "string") return Float(Number.parseFloat(num), precision)
  else return Number.parseFloat(num.toFixed(precision))
}

const calculateRectArea = (x: number, y: number = x): number => x * y
const calculateSquareArea = (side: number): number => calculateRectArea(side)
const calculateTriangleArea = (b: number, h: number): number => (b * h) / 2
const calculateTrapezeArea = (b: number, B: number, h: number): number => ((B + b) * h) / 2
const calculateCircleArea = (radius: number, pi: number = Math.PI): number => pi * Math.pow(radius, 2)

function main(): void {
  const PI = Float(Math.PI, 5)

  console.log("TRIANGULO: %s", calculateTriangleArea(A, C).toFixed(3))
  console.log("CIRCULO: %s", calculateCircleArea(C, PI).toFixed(3))
  console.log("TRAPEZIO: %s", calculateTrapezeArea(A, B, C).toFixed(3))
  console.log("QUADRADO: %s", calculateSquareArea(B).toFixed(3))
  console.log("RETANGULO: %s", calculateRectArea(A, B).toFixed(3))
}

main()
