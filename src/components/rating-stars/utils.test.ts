import { getRatingStars } from './utils';
import { describe, it, expect } from 'vitest';

describe('getRatingStars function', () => {
  it('should calculate correct stars width for normal values', () => {
    expect(getRatingStars(1)).toBe(20);
    expect(getRatingStars(2.3)).toBe(40);
    expect(getRatingStars(4.8)).toBe(100);
  });

  it('should handle edge cases correctly', () => {
    expect(getRatingStars(0)).toBe(0);
    expect(getRatingStars(5)).toBe(100);
    expect(getRatingStars(-1)).toBe(0);
    expect(getRatingStars(6)).toBe(100);
  });
});
