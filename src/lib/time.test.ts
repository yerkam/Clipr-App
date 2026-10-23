import { describe, it, expect } from 'vitest'
import { formatTimecode } from './time'

describe('formatTimecode', () => {
  it('formats zero seconds', () => {
    expect(formatTimecode(0)).toBe('00:00.000')
    expect(formatTimecode(0, false)).toBe('00:00')
  })

  it('formats seconds less than a minute', () => {
    expect(formatTimecode(5)).toBe('00:05.000')
    expect(formatTimecode(42)).toBe('00:42.000')
  })

  it('formats minutes', () => {
    expect(formatTimecode(65)).toBe('01:05.000')
    expect(formatTimecode(600)).toBe('10:00.000')
    expect(formatTimecode(3599)).toBe('59:59.000')
  })

  it('formats hours', () => {
    expect(formatTimecode(3600)).toBe('1:00:00.000')
    expect(formatTimecode(3665)).toBe('1:01:05.000')
    expect(formatTimecode(36000)).toBe('10:00:00.000')
  })

  it('handles fractional seconds', () => {
    expect(formatTimecode(1.5)).toBe('00:01.500')
    expect(formatTimecode(1.1234)).toBe('00:01.123')
    expect(formatTimecode(1.999)).toBe('00:01.999')
    expect(formatTimecode(1.9995)).toBe('00:02.000') // rounds to nearest ms
  })

  it('respects withMillis flag', () => {
    expect(formatTimecode(65, false)).toBe('01:05')
    expect(formatTimecode(3665, false)).toBe('1:01:05')
    expect(formatTimecode(1.9995, false)).toBe('00:02')
  })

  it('handles edge cases (negative numbers, NaN, Infinity)', () => {
    expect(formatTimecode(-5)).toBe('00:00.000')
    expect(formatTimecode(NaN)).toBe('00:00.000')
    expect(formatTimecode(Infinity)).toBe('00:00.000')
    expect(formatTimecode(-Infinity)).toBe('00:00.000')
  })
})
