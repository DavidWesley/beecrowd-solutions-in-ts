import { readFileSync } from "node:fs"
import { EOL } from "node:os"
import { stdin } from "node:process"
import { format } from "node:util"

const input = readFileSync(stdin.fd, { encoding: "ascii" })
  .split(EOL, 1)
  .map(Number.parseFloat)
  .at(0) as number

const Float = (num: number | string, precision: number): number => {
  if (typeof num === "string") return Float(Number.parseFloat(num), precision)
  else return Number.parseFloat(num.toFixed(precision))
}

type NoteType = "note" | "coin"
interface NoteDetails {
  cash: number
  remaining: number
  info: Array<{
    note: number
    quantity: number
    type: NoteType
  }>
}

function getFewestNotesSequence(cash: number, banknotes?: Array<number>): Readonly<NoteDetails> {
  const DEFAULT_BANKNOTES = [200, 100, 50, 20, 10, 5, 2, 1, 0.5, 0.25, 0.1, 0.05, 0.01]
  banknotes = (banknotes ?? DEFAULT_BANKNOTES).sort((nA, nB) => nB - nA)

  return Object.freeze({
    cash,
    info: banknotes.map((note) => {
      const quantity = Math.floor(cash / note)
      cash = Float(cash - quantity * note, 2)
      return { note, quantity, type: Number.isInteger(note) ? "note" : "coin" as NoteType }
    }),
    remaining: cash
  })
}

function main(): void {
  const notes = getFewestNotesSequence(input, [100, 50, 20, 10, 5, 2])
  const coins = getFewestNotesSequence(notes.remaining, [1, 0.5, 0.25, 0.1, 0.05, 0.01])

  console.log("NOTAS:")
  console.log(
    notes
      .info
      .map(({ quantity, note }) => format("%d nota(s) de R$ %s", quantity, note.toFixed(2)))
      .join(EOL)
  )
  console.log("MOEDAS:")
  console.log(
    coins
      .info
      .map(({ quantity, note }) => format("%d moeda(s) de R$ %s", quantity, note.toFixed(2)))
      .join(EOL)
  )
}

main()
