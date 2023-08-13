import { readFileSync } from "node:fs"
import { stdin } from "node:process"

const [A, B, C] = readFileSync(stdin.fd, { encoding: "ascii" })
  .split(/\s+/, 3)
  .map((value) => Number.parseInt(value, 10)) as [number, number, number]

function max(values: Array<number>): number {
  return Reflect.apply<null, Array<number>, number>(Math.max, null, values)
}

function main(): void {
  const bigger = max([A, B, C])
  console.log("%d eh o maior", bigger)
}

main()
