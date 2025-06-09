import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { createStore } from 'redux';
import FavoritesList from './';
import { makeFakeCard } from '../../mocks/mocks';
import { State } from '../../store/type';
import { LoadingStatus } from '../../const/enum';
import rootReducer from '../../store/root-reducer';

describe('Component: FavoritesList', () => {
  it('should render grouped favorite offers by city', () => {
    const parisOffer = makeFakeCard({ cityKey: 'Paris' });
    const anotherParisOffer = makeFakeCard({ cityKey: 'Paris' });
    const cologneOffer = makeFakeCard({ cityKey: 'Cologne' });

    const initialState: Partial<State> = {
      FAVORITE: {
        favoriteOffers: [parisOffer, anotherParisOffer, cologneOffer],
        isFavoriteOffersLoading: false,
        uploadingFavoriteStatus: LoadingStatus.Idle
      }
    };

    const store = createStore(rootReducer, initialState);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FavoritesList />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Cologne')).toBeInTheDocument();

    const parisLink = screen.getByRole('link', { name: 'Paris' });
    expect(parisLink).toHaveAttribute('href', '/?city=Paris');

  });
});
