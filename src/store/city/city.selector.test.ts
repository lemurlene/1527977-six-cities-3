import { NameSpace } from '../const';
import { Setting } from '../../const/const';
import { selectCurrentCity } from './city.selector';

describe('city selector', () => {
  const state = {
    [NameSpace.City]: {
      currentCity: Setting.DefaultCity
    }
  };

  it('should return current city from state', () => {
    const { currentCity } = state[NameSpace.City];

    const result = selectCurrentCity(state);

    expect(result).toBe(currentCity);
  });
});
