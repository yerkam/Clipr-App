import { describe, it, expect } from 'vitest'
import { parseTimecode } from './time'

describe('parseTimecode', () => {
  it.each([
    // Happy paths: simple numbers
    ['42', 42],
    ['0', 0],
    ['1.5', 1.5],
    ['0.25', 0.25],
    ['42.0', 42],

    // Happy paths: minutes and seconds
    ['1:30', 90],
    ['0:45', 45],
    ['1:05', 65],
    ['1:30.5', 90.5],
    ['00:30', 30],
    ['10:00', 600],

    // Happy paths: hours, minutes and seconds
    ['1:00:00', 3600],
    ['1:01:01', 3661],
    ['2:30:15.5', 9015.5],
    ['01:00:00', 3600],

    // Edge cases: whitespace and formatting
    ['  42  ', 42],
    ['\t1:30\n', 90],
    ['1,5', 1.5], // comma instead of dot
    ['1:30,5', 90.5],

    // Error conditions: invalid inputs
    ['', null],
    ['   ', null],
    ['1:1:1:1', null], // too many parts
    ['abc', null],
    ['1:abc', null],
    ['1:30:abc', null],
    ['.', null],
    ['1:', null],
    [':30', null],
    ['1::30', null],
    ['NaN', null],
    ['Infinity', null],
  ])('parses %s to %s', (input, expected) => {
    expect(parseTimecode(input)).toBe(expected)
  })
})
