import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app';
import { store } from './store';
import { checkAuthorization } from './store/api-action';
import ErrorMessage from './components/error-message';
import { Setting } from './const/const';
import { offers } from './mocks/offers';

store.dispatch(checkAuthorization());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage />
      <App cardsCount={Setting.CardsCount} offers={offers}
        NearPlacesCardsCount={Setting.NearPlacesCardsCount}
      />
    </Provider>
  </React.StrictMode>
);
