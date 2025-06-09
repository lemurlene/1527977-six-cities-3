import { errorSlice, setError } from './error.slice';

describe('error slice', () => {
  const initialState = {
    error: null,
  };

  it('should return initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const result = errorSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(initialState);
  });

  it('should return unchanged state with empty action and defined state', () => {
    const currentState = { error: 'Previous error' };
    const emptyAction = { type: '' };
    const result = errorSlice.reducer(currentState, emptyAction);
    expect(result).toEqual(currentState);
  });

  it('should set error message on setError action', () => {
    const errorMessage = 'New error occurred';
    const result = errorSlice.reducer(initialState, setError(errorMessage));
    expect(result).toEqual({ error: errorMessage });
  });

  it('should set error to null when setError is dispatched with null', () => {
    const currentState = { error: 'Some error' };
    const result = errorSlice.reducer(currentState, setError(null));
    expect(result).toEqual({ error: null });
  });
});
