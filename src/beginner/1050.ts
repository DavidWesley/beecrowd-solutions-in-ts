import { readFileSync } from "node:fs"
import { EOL } from "node:os"
import { stdin } from "node:process"

const input = readFileSync(stdin.fd, { encoding: "utf8" })
  .split(EOL, 1)
  .map((value) => Number.parseInt(value, 10))
  .at(0) as number

function parseDataTable<K, V>(data: ReadonlyArray<[K, V]>): Map<K, V> {
  return new Map<K, V>(data)
}

function main(): void {
  const DATA_TABLE: ReadonlyArray<[number, string]> = Object.freeze([
    [61, "Brasilia"],
    [71, "Salvador"],
    [11, "Sao Paulo"],
    [21, "Rio de Janeiro"],
    [32, "Juiz de Fora"],
    [19, "Campinas"],
    [27, "Vitoria"],
    [31, "Belo Horizonte"]
  ])

  const table = parseDataTable<number, string>(DATA_TABLE)
  const query = table.get(input) ?? "DDD nao cadastrado"

  console.log(query)
}

main()
