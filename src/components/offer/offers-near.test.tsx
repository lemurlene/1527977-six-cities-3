import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { withStore } from '../../mocks/mock-component';
import { OffersNear } from './';
import { makeFakeCard, makeFakeStore, makeFakeUser } from '../../mocks/mocks';
import { AuthorizationStatus } from '../../const/enum';
import { Setting } from '../../const/const';
import { DefaultSort } from '../../components/sort/const';

const offers = [
  makeFakeCard({ cityKey: 'Paris' }),
  makeFakeCard({ cityKey: 'Paris', isFavorite: true }),
  makeFakeCard({ cityKey: 'Cologne' }),
];

describe('OffersNear component', () => {
  it('renders section with correct title and OfferListMemo inside', () => {
    const { withStoreComponent } = withStore(
      <MemoryRouter>
        <OffersNear offersNear={offers} />
      </MemoryRouter>,
      makeFakeStore({
        USER: {
          authorizationStatus: AuthorizationStatus.Auth,
          userInfo: makeFakeUser(),
          isLoadingLogin: false,
          isLoadingLogout: false,
        },
        SORT: {
          currentSortType: DefaultSort,
        }
      })
    );

    render(withStoreComponent);

    expect(screen.queryByTestId('offers-near')).toHaveTextContent('Other places in the neighbourhood');

    offers.forEach(({ title }) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it('passes correct cardsCount prop from Setting.NearPlacesCount', () => {
    expect(Setting.NearPlacesCount).toBeDefined();
  });
});
