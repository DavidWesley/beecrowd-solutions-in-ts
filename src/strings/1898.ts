import { readFileSync } from "node:fs"
import { EOL } from "node:os"
import { stdin } from "node:process"

const input = readFileSync(stdin.fd, { encoding: "utf8" }).split(EOL, 2) as [string, string]

const sanitizeString = (value: string) => {
  return value.replace(/[^\d.]/g, "").replace(/([.]\d{1,2})(\d*)/, "$1")
}

function main(): void {
  const strA = sanitizeString(input[0])
  const strB = sanitizeString(input[1])
  const valA = Number.parseFloat(strA.substring(11))
  const valB = Number.parseFloat(strB)

  console.log("cpf %s", strA.substring(0, 11))
  console.log((valA + valB).toFixed(2))
}

main()
