import { Setting, Cities } from '../../const/const';
import { citySlice, changeCity } from './city.slice';

describe('city clice', () => {
  const defaultCity = Setting.DefaultCity;
  const testCity = Cities.Amsterdam;

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = { currentCity: testCity };

    const result = citySlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = { currentCity: defaultCity };

    const result = citySlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return new state based on given city name', () => {
    const initialState = { currentCity: defaultCity };
    const expectedState = { currentCity: testCity };

    const result = citySlice.reducer(initialState, changeCity(testCity));

    expect(result).toEqual(expectedState);
  });
});
