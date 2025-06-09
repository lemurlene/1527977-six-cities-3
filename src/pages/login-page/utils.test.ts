import { describe, it, expect } from 'vitest';
import { getRandomCity } from './utils';
import { Cities } from '../../const/const';

describe('getRandomCity', () => {
  it('should return a city from Cities', () => {
    const city = getRandomCity();

    expect(Object.values(Cities)).toContain(city);
  });

  it('should return different cities (random check)', () => {
    const results = new Set<string>();
    for (let i = 0; i < 100; i++) {
      results.add(getRandomCity());
    }
    expect(results.size).toBeGreaterThan(1);
  });
});
