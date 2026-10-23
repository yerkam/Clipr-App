import { describe, it, expect } from 'vitest'
import { maxOutputHeight } from './settings'

describe('maxOutputHeight', () => {
  it('returns undefined for "source"', () => {
    expect(maxOutputHeight('source')).toBeUndefined()
  })

  it('returns 1080 for "1080"', () => {
    expect(maxOutputHeight('1080')).toBe(1080)
  })

  it('returns 720 for "720"', () => {
    expect(maxOutputHeight('720')).toBe(720)
  })

  it('returns 480 for "480"', () => {
    expect(maxOutputHeight('480')).toBe(480)
  })
})
