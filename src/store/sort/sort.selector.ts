import { NameSpace } from '../const';
import { State } from '../type';

const selectSortListType = (state: Pick<State, typeof NameSpace.Sort>) => state[NameSpace.Sort].currentSortType;

export {selectSortListType};
