import { readFileSync } from "node:fs"
import { EOL } from "node:os"
import { stdin } from "node:process"
import { format } from "node:util"

const input = readFileSync(stdin.fd, { encoding: "ascii" })
  .split(EOL, 1)
  .map((value) => Number.parseInt(value, 10))
  .at(0) as number

type NoteType = "note" | "coin"
interface NoteDetails {
  note: number
  quantity: number
  type: NoteType
}

function getFewestNotesSequence(cash: number, banknotes?: Array<number>): Readonly<{ info: Array<NoteDetails> }> {
  const DEFAULT_BANKNOTES = [200, 100, 50, 20, 10, 5, 2, 1, 0.5, 0.25, 0.1, 0.05, 0.01]
  banknotes = (banknotes ?? DEFAULT_BANKNOTES).sort((nA, nB) => nB - nA)

  return Object.freeze({
    info: banknotes.map((note) => {
      const quantity = Math.floor(cash / note)
      cash -= quantity * note
      return { note, quantity, type: Number.isInteger(note) ? "note" : "coin" } satisfies NoteDetails
    })
  })
}

function main(): void {
  const cashFormatter = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    notation: "standard",
    style: "currency",
    currency: "BRL",
    signDisplay: "never",
    useGrouping: false
  })

  const { info } = getFewestNotesSequence(input, [100, 50, 20, 10, 5, 2, 1])

  console.log(input)
  console.log(
    info
      .map((detail) => {
        return format(
          "%d %s(s) de %s",
          detail.quantity,
          detail.type === "note" ? "nota" : "moeda",
          cashFormatter.format(detail.note)
        )
      })
      .join(EOL)
  )
}

main()
