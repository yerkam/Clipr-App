import { describe, it, expect } from 'vitest'
import { clamp, formatTimecode, formatDuration, parseTimecode, timecodeForFileName } from './time'

describe('time utils', () => {
  describe('clamp', () => {
    it('returns the value if within range', () => {
      expect(clamp(5, 0, 10)).toBe(5)
    })

    it('returns the min if value is below range', () => {
      expect(clamp(-5, 0, 10)).toBe(0)
    })

    it('returns the max if value is above range', () => {
      expect(clamp(15, 0, 10)).toBe(10)
    })
  })

  describe('formatTimecode', () => {
    it('formats 0 seconds', () => {
      expect(formatTimecode(0)).toBe('00:00.000')
    })

    it('formats sub-seconds', () => {
      expect(formatTimecode(0.5)).toBe('00:00.500')
      expect(formatTimecode(0.123)).toBe('00:00.123')
      expect(formatTimecode(0.001)).toBe('00:00.001')
    })

    it('formats seconds and minutes', () => {
      expect(formatTimecode(5)).toBe('00:05.000')
      expect(formatTimecode(65)).toBe('01:05.000')
      expect(formatTimecode(125)).toBe('02:05.000')
    })

    it('formats hours', () => {
      expect(formatTimecode(3600)).toBe('1:00:00.000')
      expect(formatTimecode(3665)).toBe('1:01:05.000')
      expect(formatTimecode(36000)).toBe('10:00:00.000')
    })

    it('formats without milliseconds if requested', () => {
      expect(formatTimecode(65, false)).toBe('01:05')
      expect(formatTimecode(3665, false)).toBe('1:01:05')
    })

    it('handles negative or invalid values gracefully', () => {
      expect(formatTimecode(-5)).toBe('00:00.000')
      expect(formatTimecode(NaN)).toBe('00:00.000')
      expect(formatTimecode(Infinity)).toBe('00:00.000')
    })
  })

  describe('formatDuration', () => {
    it('formats short durations with 2 decimals', () => {
      expect(formatDuration(0)).toBe('0.00s')
      expect(formatDuration(5.123)).toBe('5.12s')
      expect(formatDuration(9.999)).toBe('10.00s')
    })

    it('formats durations between 10s and 60s with 1 decimal', () => {
      expect(formatDuration(10)).toBe('10.0s')
      expect(formatDuration(45.678)).toBe('45.7s')
      expect(formatDuration(59.99)).toBe('60.0s')
    })

    it('formats durations over 60s as timecodes without milliseconds', () => {
      expect(formatDuration(60)).toBe('01:00')
      expect(formatDuration(65)).toBe('01:05')
      expect(formatDuration(3665)).toBe('1:01:05')
    })
  })

  describe('parseTimecode', () => {
    it('parses pure seconds', () => {
      expect(parseTimecode('5')).toBe(5)
      expect(parseTimecode('65')).toBe(65)
      expect(parseTimecode('1.5')).toBe(1.5)
      expect(parseTimecode('1,5')).toBe(1.5) // supports comma as decimal separator
    })

    it('parses MM:SS', () => {
      expect(parseTimecode('01:05')).toBe(65)
      expect(parseTimecode('1:5')).toBe(65)
      expect(parseTimecode('01:05.5')).toBe(65.5)
    })

    it('parses HH:MM:SS', () => {
      expect(parseTimecode('01:00:00')).toBe(3600)
      expect(parseTimecode('1:01:05')).toBe(3665)
      expect(parseTimecode('10:00:00.123')).toBe(36000.123)
    })

    it('handles whitespace', () => {
      expect(parseTimecode('  01:05  ')).toBe(65)
    })

    it('returns null for invalid inputs', () => {
      expect(parseTimecode('')).toBeNull()
      expect(parseTimecode('   ')).toBeNull()
      expect(parseTimecode('abc')).toBeNull()
      expect(parseTimecode('1:2:3:4')).toBeNull() // too many parts
      expect(parseTimecode('1:abc')).toBeNull()
      expect(parseTimecode('.')).toBeNull()
      expect(parseTimecode('1:.')).toBeNull()
    })
  })

  describe('timecodeForFileName', () => {
    it('replaces colons and dots with dashes', () => {
      expect(timecodeForFileName(0)).toBe('00-00-000')
      expect(timecodeForFileName(65.123)).toBe('01-05-123')
      expect(timecodeForFileName(3665.5)).toBe('1-01-05-500')
    })
  })
})
