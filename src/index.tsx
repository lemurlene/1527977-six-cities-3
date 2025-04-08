import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app';
import { store } from './store';
import { Setting } from './const/const';
import { offers } from './mocks/offers';
import { offer } from './mocks/offer';
import { comments } from './mocks/comments';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App cardsCount={Setting.CardsCount} offers={offers} offer={offer}
        comments={comments} offersNear={offers}
        NearPlacesCardsCount={Setting.NearPlacesCardsCount}
      />
    </Provider>
  </React.StrictMode>
);
