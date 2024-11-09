class Point2D {
  constructor(
    protected x: number,
    protected y: number
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
    let x = 0
    let y = 0

    for (const point of points) {
      x += point.X
      y += point.Y
    }

    return new Point2D(x / points.length, y / points.length)
  }
}

class Gauss {
  protected static sort(points: Point2D[]): Point2D[] {
    // Finds a point in the interior of `pts
    const midPoint = Point2D.midPoint(points)

    // Calculate the angle between each point and the CenterPoint, and sort by those angles
    const angles = new Map<Point2D, number>()

    for (const point of points) {
      const angle = Math.atan2(point.Y - midPoint.Y, point.X - midPoint.X)
      angles.set(point, angle)
    }

    return points.sort((pointA, pointB) => angles.get(pointA)! - angles.get(pointB)!)
  }

  public static polygonArea(points: Point2D[]): number {
    let sum = 0

    if (points.length <= 2) return sum

    const sortedPoints = Gauss.sort(points)

    for (let index = 0; index < sortedPoints.length; index++) {
      const pointA = sortedPoints.at(index)!
      const pointB = sortedPoints.at((index + 1) % sortedPoints.length)!

      sum += pointA.X * pointB.Y - pointB.X * pointA.Y
    }

    return 0.5 * sum
  }
}

import { readFileSync } from "node:fs"
import { EOL } from "node:os"
import { stdin } from "node:process"

const input = readFileSync(stdin.fd, { encoding: "utf8" })
  .split(EOL, 8)
  .map((line) => line.split(" ", 2).map(Number.parseFloat))
  .map(([x, y]) => new Point2D(x!, y!))

function main(): void {
  const tA = input.slice(0, 4)
  const tB = input.slice(4, 8)

  console.log(Gauss.polygonArea(tA) > Gauss.polygonArea(tB) ? "terreno A" : "terreno B")
}

main()
