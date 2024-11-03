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

  public static distanceBetween(pA: Point2D, pB: Point2D): number {
    return Math.hypot(pA.X - pB.X, pA.Y - pB.Y)
  }
}

class Vector2D {
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

  public get size(): number {
    return Math.hypot(this.x, this.y)
  }

  public get direction(): Vector2D {
    if (this.size === 0) return new Vector2D(0, 0)

    return new Vector2D(this.x / this.size, this.y / this.size)
  }

  public multiplyByScalar(value: number): this {
    this.x *= value
    this.y *= value

    return this
  }

  public inverse(): this {
    return this.multiplyByScalar(-1)
  }

  public static copy(vec: Vector2D): Vector2D {
    return new Vector2D(vec.x, vec.y)
  }

  public static sum(...vectors: (Vector2D | Point2D)[]): Vector2D {
    let x = 0
    let y = 0

    for (const vec of vectors) {
      x += vec.X
      y += vec.Y
    }

    return new Vector2D(x, y)
  }

  public static fromPoints(end: Point2D, origin: Point2D = new Point2D(0, 0)): Vector2D {
    return new Vector2D(end.X - origin.X, end.Y - origin.Y)
  }

  public static isNull(vec: Vector2D): boolean {
    return vec.X === 0 && vec.Y === 0 && vec.size === 0
  }
}

import { readFileSync } from "node:fs"
import { EOL } from "node:os"
import { stdin } from "node:process"

const input = readFileSync(stdin.fd, { encoding: "utf8" })
  .split(EOL)
  .map((line) => line.split(/\s/g, 7).map((value) => Number.parseInt(value, 10))) as Array<[number, number, number, number, number, number, number]>

function main(): void {
  const output = []

  for (const line of input) {
    if (Number.isNaN(line[0])) break

    const [Xf = 0, Yf = 0, Xi = 0, Yi = 0, Vi = 0, R1 = 0, R2 = 0] = line
    let [positionA, positionB] = [new Point2D(Xf, Yf), new Point2D(Xi, Yi)]
    let direction = Vector2D.fromPoints(positionB, positionA).direction
    if (Vector2D.isNull(direction)) direction = new Vector2D(1, 0)

    const displacement = direction.multiplyByScalar(1.5 * Vi)
    positionB = new Point2D(positionB.X + displacement.X, positionB.Y + displacement.Y)
    const distance = Point2D.distanceBetween(positionA, positionB)

    output.push(distance <= R1 + R2 ? "Y" : "N")
  }

  console.log(output.join(EOL))
}

main()
