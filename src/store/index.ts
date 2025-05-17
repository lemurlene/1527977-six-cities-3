import { configureStore } from '@reduxjs/toolkit';
import reducer from './root-reducer.ts';
import createAPI from '../services/api.ts';
import { processErrorHandle } from '../services/process-error-handle';

const api = createAPI(processErrorHandle);

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export {api, store};
