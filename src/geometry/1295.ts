class Point2D {
  constructor(
    private x: number,
    private y: number
  ) {}

  public get X(): number {
    return this.x
  }

  public get Y(): number {
    return this.y
  }

  public toString(): string {
    return `(${this.X}, ${this.Y})`
  }

  public static distanceBetween(pA: Point2D, pB: Point2D): number {
    return Math.hypot(pA.X - pB.X, pA.Y - pB.Y)
  }

  public static midPoint(points: Point2D[]): Point2D {
    const [sumX, sumY] = points.reduce(([sumX, sumY], { X, Y }) => [sumX + X, sumY + Y], [0, 0])
    return new Point2D(sumX / points.length, sumY / points.length)
  }
}

class ClosestPair {
  public static closestPair(points: Point2D[]): number {
    points.sort((a, b) => a.X - b.X)
    return ClosestPair.findClosestPair(points, 0, points.length)
  }

  private static findClosestPair(points: Point2D[], left: number, right: number): number {
    if (right - left <= 3) return ClosestPair.bruteForce(points, left, right)

    const mid = Math.floor((left + right) / 2)
    const midPoint = points[mid]

    const minDistLeft = ClosestPair.findClosestPair(points, left, mid)
    const minDistRight = ClosestPair.findClosestPair(points, mid, right)
    const minDist = Math.min(minDistLeft, minDistRight)

    const strip: Point2D[] = []
    for (let i = left; i < right; i++) {
      if (Math.abs(points[i]!.X - midPoint!.X) < minDist) {
        strip.push(points[i]!)
      }
    }

    return Math.min(minDist, ClosestPair.closestInStrip(strip, minDist))
  }

  private static bruteForce(points: Point2D[], left: number, right: number): number {
    let minDist = Number.POSITIVE_INFINITY
    for (let i = left; i < right; i++) {
      for (let j = i + 1; j < right; j++) {
        minDist = Math.min(minDist, Point2D.distanceBetween(points[i]!, points[j]!))
      }
    }
    return minDist
  }

  private static closestInStrip(strip: Point2D[], minDist: number): number {
    strip.sort((a, b) => a.Y - b.Y)
    let min = minDist
    for (let i = 0; i < strip.length; i++) {
      for (let j = i + 1; j < strip.length && strip[j]!.Y - strip[i]!.Y < min; j++) {
        min = Math.min(min, Point2D.distanceBetween(strip[i]!, strip[j]!))
      }
    }
    return min
  }
}

import { readFileSync } from "node:fs"
import { EOL } from "node:os"
import { stdin } from "node:process"

const input = readFileSync(stdin.fd, { encoding: "utf8" })
  .split(EOL)
  .map((line) => line.split(" ", 2).map(Number.parseFloat)) as Array<[number, number]>

function main(): void {
  const output: string[] = []

  for (let [i, N] = [0, 0]; i < input.length; i += N + 1) {
    N = input[i]![0]
    if (N === 0) break

    const points: Array<Point2D> = Array.from({ length: N }, (_, j) => {
      const [x = 0, y = 0] = input[i + 1 + j]!
      return new Point2D(x, y)
    })

    const closestDistance = ClosestPair.closestPair(points)

    if (closestDistance < 10_000) output.push(closestDistance.toFixed(4))
    else output.push(Number.POSITIVE_INFINITY.toString().toUpperCase())
  }

  console.log(output.join(EOL))
}

main()
