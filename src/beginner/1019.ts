import { readFileSync } from "node:fs"
import { EOL } from "node:os"
import { stdin } from "node:process"

const input = readFileSync(stdin.fd, { encoding: "ascii" })
  .split(EOL, 1)
  .map((value) => Number.parseInt(value, 10))
  .at(0) as number

//// TIME UNITS ////
export type TimeUnit = "millisecond" | "second" | "minute" | "hour" | "day" | "month" | "year" | "decade"
export type Time = { [k in TimeUnit]: number }

export const TIME_UNITS: Readonly<Time> = Object.freeze({
  get millisecond() { return 1 },
  get second() { return 1000 * this.millisecond },
  get minute() { return 60 * this.second },
  get hour() { return 60 * this.minute },
  get day() { return 24 * this.hour },
  get month() { return 30 * this.day }, // 30 days
  get year() { return 365 * this.day }, // 365 days
  get decade() { return 10 * this.year }

  //...
})

export class InvalidTimeUnitError extends RangeError {
  constructor(message: string) {
    super(message)
  }
}

export function convertTimeDurationToParts(duration: number, inputScale: TimeUnit, outputScale: TimeUnit): Readonly<Partial<Time>> {
  if (Object.hasOwn(TIME_UNITS, inputScale) === false)
    throw new InvalidTimeUnitError(`Invalid time scale: ${inputScale}`)
  if (Object.hasOwn(TIME_UNITS, outputScale) === false)
    throw new InvalidTimeUnitError(`Invalid time scale: ${outputScale}`)

  let remainingMilliseconds = duration * TIME_UNITS[inputScale]

  const units: ReadonlyArray<TimeUnit> = ["decade", "year", "month", "day", "hour", "minute", "second", "millisecond"]

  return Object.freeze(
    units.reduce((obj, unit) => {
      if (TIME_UNITS[unit] <= TIME_UNITS[outputScale]) {
        obj[unit] = Math.floor(remainingMilliseconds / TIME_UNITS[unit])
        remainingMilliseconds %= TIME_UNITS[unit]
      }
      return obj
    }, {} as Partial<Time>)
  )
}

//// MAIN ////
function main(): void {
  const { second, minute, hour } = convertTimeDurationToParts(input, "second", "hour")
  console.log([hour, minute, second].join(":"))
}

main()
