import { readFileSync } from "node:fs"
import { EOL } from "node:os"
import { stdin } from "node:process"

class Point2D {
  constructor(public x: number, public y: number) {}

  toString() {
    return `(${this.x}, ${this.y})`
  }
}

const input = readFileSync(stdin.fd, { encoding: "ascii" })
  .split(EOL, 2)
  .map((line) => line.split(/\s+/, 2).map(Number.parseFloat))
  .map(([x, y]) => new Point2D(x!, y!)) as [Point2D, Point2D]

function distance2D(pointA: Point2D, pointB: Point2D): number {
  return Math.hypot(pointA.x - pointB.x, pointA.y - pointB.y)
}

function main(): void {
  const [pA, pB] = input
  console.log(distance2D(pA, pB).toFixed(4))
}

main()
