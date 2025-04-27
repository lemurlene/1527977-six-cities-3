import { NameSpace } from '../const';
import { State } from '../type';
import { CitiesEnum } from '../../const/type';

const selectCurrentCity = (state: State):CitiesEnum => state[NameSpace.City].currentCity;

export { selectCurrentCity };
