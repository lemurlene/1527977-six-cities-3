import { describe, it, expect } from 'vitest';
import { formatedDate } from './utils';

describe('formatedDate', () => {
  it('returns the month and year for the correct date', () => {
    const input = '2024-06-15T12:00:00Z';
    const output = formatedDate(input);
    expect(output).toBe('June 2024');
  });

  it('works with different dates', () => {
    expect(formatedDate('2021-12-01')).toBe('December 2021');
    expect(formatedDate('1999-01-31')).toBe('January 1999');
  });

  it('handles incorrect dates', () => {
    const badDate = 'invalid-date-string';
    const result = formatedDate(badDate);
    expect(result).toBe('Invalid Date');
  });
});
