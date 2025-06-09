import { DefaultSort, SortTypes } from '../../components/sort/const';
import { sortSlice, changeSort } from './sort.slice';

describe('sort clice', () => {
  const defaultSortType = DefaultSort;
  const testSortType = SortTypes.Low;

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = { currentSortType: testSortType };

    const result = sortSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = { currentSortType: defaultSortType };

    const result = sortSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return new state based on given sort type', () => {
    const initialState = { currentSortType: defaultSortType };
    const expectedState = { currentSortType: testSortType };

    const result = sortSlice.reducer(initialState, changeSort(testSortType));

    expect(result).toEqual(expectedState);
  });
});
