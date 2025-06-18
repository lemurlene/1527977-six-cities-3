import { describe, it, expect } from 'vitest';
import { GetRandomCity } from './utils';
import { Cities, Setting } from '../../const/const';

describe('getRandomCity', () => {
  const currentCity = Setting.DefaultCity;

  it('should return a city from Cities not currentCity', () => {

    const city = GetRandomCity(currentCity);
    expect(city).not.toBe(currentCity);
    expect(Object.values(Cities)).toContain(city);
  });

  it('should return different cities (random check)', () => {

    const results = new Set<string>();
    for (let i = 0; i < 100; i++) {
      results.add(GetRandomCity(currentCity));
    }
    expect(results.size).toBeGreaterThan(1);
  });
});
