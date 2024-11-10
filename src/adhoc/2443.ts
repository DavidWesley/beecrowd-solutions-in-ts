class MyMath {
  public static gcd(x: number, y: number): number {
    if (Number.isNaN(x) || Number.isNaN(y)) return Number.NaN
    x = Math.abs(x)
    y = Math.abs(y)
    while (y) [x, y] = [y, x % y]
    return x
  }

  public static lcm(...numbers: number[]): number {
    if (numbers.includes(0)) return 0
    return numbers.reduce((lcm, value) => (lcm * value) / MyMath.gcd(value, lcm))
  }
}

import { readFileSync } from "node:fs"
import { stdin } from "node:process"

const input = readFileSync(stdin.fd, { encoding: "utf8" })
  .split(/\s+/, 4)
  .map((value) => Number.parseInt(value, 10)) as [number, number, number, number]

function main(): void {
  const [A, B, C, D] = input
  const [num, dem] = [A * D + B * C, B * D]
  const gcd = MyMath.gcd(num, dem)

  console.log(num / gcd, dem / gcd)
}

main()
