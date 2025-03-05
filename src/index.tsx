import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';
import { Setting } from './const/const';
import { offers } from './mocks/offers';
import { offer } from './mocks/offer';
import { comments } from './mocks/comments';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offers={offers} cardsCount={Setting.CardsCount} offer={offer} comments={comments} offersNear={offers} NearPlacesCardsCount={Setting.NearPlacesCardsCount} />
  </React.StrictMode>
);
