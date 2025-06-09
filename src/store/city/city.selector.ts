import { NameSpace } from '../const';
import { State } from '../type';

const selectCurrentCity = (state: Pick<State, typeof NameSpace.City>) => state[NameSpace.City].currentCity;

export { selectCurrentCity };
