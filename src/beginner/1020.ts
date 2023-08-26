import { readFileSync } from "node:fs"
import { EOL } from "node:os"
import { stdin } from "node:process"

const input = readFileSync(stdin.fd, { encoding: "ascii" })
  .split(EOL, 1)
  .map((value) => Number.parseInt(value, 10))
  .at(0) as number

//// TIME UNITS ////
type TimeUnitType = "millisecond" | "second" | "minute" | "hour" | "day" | "month" | "year" | "decade"
type TimeDetailType = { [k in TimeUnitType]: number }

class InvalidTimeUnitError extends RangeError {
  constructor(message: string) {
    super(message)
    this.name = "InvalidTimeUnitError"
  }
}

class TimeUnits {
  public static readonly CONSTANTS: Readonly<TimeDetailType> = Object.freeze({
    get millisecond() { return 1 },
    get second() { return 1000 * this.millisecond },
    get minute() { return 60 * this.second },
    get hour() { return 60 * this.minute },
    get day() { return 24 * this.hour },
    get month() { return 30 * this.day },
    get year() { return 365 * this.day },
    get decade() { return 10 * this.year }
    //...
  })

  private static readonly NAMES: ReadonlyArray<TimeUnitType> = Object.freeze(
    Object.keys(TimeUnits.CONSTANTS) as ReadonlyArray<TimeUnitType>
  )

  /**
   * Converts a time duration to its constituent parts.
   *
   * @param {number} duration - The duration to convert.
   * @param {TimeUnitType} inputScale - The input time scale of the duration.
   * @param {TimeUnitType} outputScale - The desired bigger output time scale.
   * @throws {InvalidTimeUnitError} If the inputScale or outputScale is not a valid time scale.
   * @returns {Readonly<Partial<TimeDetailType>>} An object containing the converted time duration in the desired output scale.
   */
  public static convertTimeDurationToParts(duration: number, inputScale: TimeUnitType, outputScale: TimeUnitType): Readonly<Partial<TimeDetailType>> {
    if (Object.hasOwn(TimeUnits.CONSTANTS, inputScale) === false)
      throw new InvalidTimeUnitError(`Invalid time scale: ${inputScale}`)
    if (Object.hasOwn(TimeUnits.CONSTANTS, outputScale) === false)
      throw new InvalidTimeUnitError(`Invalid time scale: ${outputScale}`)

    let remainingMilliseconds = duration * TimeUnits.CONSTANTS[inputScale]

    return Object.freeze(
      TimeUnits.NAMES.reduceRight((obj, name) => {
        if (TimeUnits.CONSTANTS[name] <= TimeUnits.CONSTANTS[outputScale]) {
          Reflect.set(obj, name, Math.floor(remainingMilliseconds / TimeUnits.CONSTANTS[name]))
          remainingMilliseconds %= TimeUnits.CONSTANTS[name]
        }
        return obj
      }, {} as Partial<TimeDetailType>)
    )
  }

  /**
   * Resolves the duration to its parts.
   *
   * @param {number} duration - The duration to be resolved.
   * @param {TimeUnitType} scale - The scale of the duration.
   * @return {ReturnType<typeof TimeUnits.convertTimeDurationToParts>} The converted duration parts.
   */
  public static resolveDuration(duration: number, scale: TimeUnitType): ReturnType<typeof TimeUnits.convertTimeDurationToParts> {
    return TimeUnits.convertTimeDurationToParts(duration, scale, TimeUnits.NAMES.at(-1)!)
  }
}


function main(): void {
  const { day, month, year } = TimeUnits.convertTimeDurationToParts(input, "day", "year")
  console.log("%d ano(s)\n%d mes(es)\n%d dia(s)", year, month, day)
}

main()