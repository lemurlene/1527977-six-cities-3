export const SortTypes = {
  Popular: 'Popular',
  Low: 'Price: low to high',
  High: 'Price: high to low',
  Top: 'Top rated first'
} as const;

export const DefaultSort = SortTypes.Popular;
