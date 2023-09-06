import * as assert from "node:assert"
import { describe, it } from "node:test"

import { Float } from "@/utils/float.ts"

describe("Float", () => {
  it("should convert a number to a floating-point number with the specified precision", () => {
    assert.strictEqual(Float(5, 2), 5.0)
    assert.strictEqual(Float(3.14159, 3), 3.142)
    assert.strictEqual(Float(10.123456789, 4), 10.1235)
  })

  it("should convert a string to a floating-point number with the specified precision", () => {
    assert.strictEqual(Float("5", 2), 5.0)
    assert.strictEqual(Float("3.14159", 3), 3.142)
    assert.strictEqual(Float("10.123456789", 4), 10.1235)
  })

  it("should return NaN if the input is not a valid number", () => {
    assert.strictEqual(Float("abc", 2), NaN)
    assert.strictEqual(Float(NaN, 3), NaN)
  })

  it("should return Infinity if the input is Infinity", () => {
    const precision = Math.floor(Math.random() * 16)

    assert.strictEqual(Float(Infinity, precision), Infinity)
    assert.strictEqual(Float("Infinity", precision), Infinity)
    assert.strictEqual(Float(Number.NEGATIVE_INFINITY, precision), Number.NEGATIVE_INFINITY)
    assert.strictEqual(Float(Number.POSITIVE_INFINITY, precision), Number.POSITIVE_INFINITY)
  })
})
