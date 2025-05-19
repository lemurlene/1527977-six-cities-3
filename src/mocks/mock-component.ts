import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { State } from '../store/type';
import createAPI from '../services/api';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { Provider } from 'react-redux';
import { AppThunkDispatch } from './mocks';

const mockProcessErrorHandle = vi.fn();

type ComponentWithMockStore = {
  withStoreComponent: JSX.Element;
  mockStore: MockStore;
  mockAxiosAdapter: MockAdapter;
}

export function withStore(
  component: JSX.Element,
  initialState: Partial<State> = {},
): ComponentWithMockStore {
  const axios = createAPI(mockProcessErrorHandle);
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  const mockStore = mockStoreCreator(initialState);

  return ({
    withStoreComponent: <Provider store={mockStore}>{component}</Provider>,
    mockStore,
    mockAxiosAdapter,
  });
}

// import { configureMockStore } from '@jedmao/redux-mock-store';
// import type { MockStoreEnhanced } from '@jedmao/redux-mock-store';
// import MockAdapter from 'axios-mock-adapter';
// import thunk from 'redux-thunk';
// import { Action } from 'redux';
// import { Provider } from 'react-redux';
// import { ReactNode, FunctionComponent } from 'react';
// import { State } from '../store/type';
// import { AppThunkDispatch } from './mocks';
// import createAPI from '../services/api';

// const mockProcessErrorHandle = vi.fn();

// interface TestReduxTools {
//   WithStore: FunctionComponent<{ children?: ReactNode }>;
//   mockStore: MockStoreEnhanced<State, Action, AppThunkDispatch>;
//   mockApi: MockAdapter;
// }

// export function setupTestRedux(
//   initialContent: ReactNode,
//   initialState?: Partial<State>
// ): TestReduxTools {
//   const api = createAPI(mockProcessErrorHandle);
//   const mockApi = new MockAdapter(api);
//   const middleware = [thunk.withExtraArgument(api)];
//   const mockStore = configureMockStore<State, Action, AppThunkDispatch>(middleware)(initialState || {});

//   const WithStore: FunctionComponent<{ children?: ReactNode }> = ({ children }) => (
//     <Provider store={mockStore}>
//       {children || initialContent}
//     </Provider>
//   );

//   return {
//     WithStore,
//     mockStore,
//     mockApi,
//   };
// }
