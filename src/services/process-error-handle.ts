import { store } from '../store';
import { setError } from '../store/error/error.slice';
import { ERROR_TIMEOUT } from './const';
import { createAppAsyncThunk } from '../hooks';

export const clearError = createAppAsyncThunk<void, undefined>(
  'error/clearError',
  () => {
    setTimeout(() => store.dispatch(setError(null)), ERROR_TIMEOUT);
  }
);

export const processErrorHandle = (message: string): void => {
  store.dispatch(setError(message));
  store.dispatch(clearError());
};
