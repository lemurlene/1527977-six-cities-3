import { describe, it, expect } from 'vitest';
import { sortOffers } from './utils';
import { SortTypes } from './const';
import { makeFakeCard } from '../../mocks/mocks';

describe('sortOffers', () => {
  const mockOffers = [
    makeFakeCard({ price: 100, rating: 3 }),
    makeFakeCard({ price: 100, rating: 4 }),
    makeFakeCard({ price: 50, rating: 5 }),
    makeFakeCard({ price: 200, rating: 2 })
  ];

  it('should return original array for Popular sort', () => {
    const result = sortOffers(mockOffers, SortTypes.Popular);
    expect(result).toEqual(mockOffers);
    expect(result).toBe(mockOffers);
  });

  it('should sort by price low to high (Low)', () => {
    const result = sortOffers(mockOffers, SortTypes.Low);
    expect(result).toEqual([
      mockOffers[2],
      mockOffers[0],
      mockOffers[1],
      mockOffers[3]
    ]);
  });

  it('should sort by price high to low (High)', () => {
    const result = sortOffers(mockOffers, SortTypes.High);
    expect(result).toEqual([
      mockOffers[3],
      mockOffers[0],
      mockOffers[1],
      mockOffers[2]
    ]);
  });

  it('should sort by rating high to low (Top)', () => {
    const result = sortOffers(mockOffers, SortTypes.Top);
    expect(result).toEqual([
      mockOffers[2],
      mockOffers[1],
      mockOffers[0],
      mockOffers[3]
    ]);
  });

  it('should maintain stable sort for equal prices', () => {
    const result = sortOffers(mockOffers, SortTypes.Low);
    const equalPriceCards = result.filter((card) => card.price === 100);
    expect(equalPriceCards[0].id).toBe(mockOffers[0].id);
    expect(equalPriceCards[1].id).toBe(mockOffers[1].id);
  });

  it('should return empty array if offers is empty', () => {
    const result = sortOffers([], SortTypes.Low);
    expect(result).toEqual([]);
  });

  it('should not mutate original array', () => {
    const original = [...mockOffers];
    sortOffers(mockOffers, SortTypes.Low);
    expect(mockOffers).toEqual(original);
  });
});
