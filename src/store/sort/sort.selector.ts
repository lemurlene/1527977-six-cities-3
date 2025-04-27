import { NameSpace } from '../const';
import { State } from '../type';
import { SortType } from '../../components/sort/type';

const selectSortListType = (state: State):SortType => state[NameSpace.Sort].currentSortType;

export {selectSortListType};
