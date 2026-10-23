import { describe, it, expect } from 'vitest'
import { sanitizeFileName } from './file'

describe('sanitizeFileName', () => {
  it('should return the same string if it contains no invalid characters', () => {
    expect(sanitizeFileName('normal_file_name')).toBe('normal_file_name')
    expect(sanitizeFileName('file-name.txt')).toBe('file-name.txt')
  })

  it('should replace invalid characters with a hyphen', () => {
    expect(sanitizeFileName('file\\name')).toBe('file-name')
    expect(sanitizeFileName('file/name')).toBe('file-name')
    expect(sanitizeFileName('file:name')).toBe('file-name')
    expect(sanitizeFileName('file*name')).toBe('file-name')
    expect(sanitizeFileName('file?name')).toBe('file-name')
    expect(sanitizeFileName('file"name')).toBe('file-name')
    expect(sanitizeFileName('file<name')).toBe('file-name')
    expect(sanitizeFileName('file>name')).toBe('file-name')
    expect(sanitizeFileName('file|name')).toBe('file-name')
  })

  it('should merge consecutive invalid characters into a single hyphen', () => {
    expect(sanitizeFileName('file\\/:*?"<>|name')).toBe('file-name')
    expect(sanitizeFileName('invalid***name???')).toBe('invalid-name-')
  })

  it('should replace consecutive spaces with a single space', () => {
    expect(sanitizeFileName('file   name')).toBe('file name')
    expect(sanitizeFileName('file \t\n name')).toBe('file name')
  })

  it('should trim leading and trailing spaces', () => {
    expect(sanitizeFileName('  file name  ')).toBe('file name')
  })

  it('should truncate the string to 120 characters', () => {
    const longName = 'a'.repeat(150)
    const sanitized = sanitizeFileName(longName)
    expect(sanitized.length).toBe(120)
    expect(sanitized).toBe('a'.repeat(120))
  })

  it('should handle empty strings', () => {
    expect(sanitizeFileName('')).toBe('')
  })
})
