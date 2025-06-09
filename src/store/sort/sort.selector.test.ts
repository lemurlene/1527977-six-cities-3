import { NameSpace } from '../const';
import { DefaultSort } from '../../components/sort/const';
import { selectSortListType } from './sort.selector';

describe('sort selector', () => {
  const state = {
    [NameSpace.Sort]: {
      currentSortType: DefaultSort
    }
  };

  it('should return current sort from state', () => {
    const { currentSortType } = state[NameSpace.Sort];

    const result = selectSortListType(state);

    expect(result).toBe(currentSortType);
  });
});
