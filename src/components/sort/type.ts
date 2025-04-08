import { SortTypes } from './const';

export type SortType = typeof SortTypes[keyof typeof SortTypes];
