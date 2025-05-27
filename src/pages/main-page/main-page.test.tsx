import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, useSearchParams } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { HelmetProvider } from 'react-helmet-async';
import MainPage from './main-page';
import { Setting, Cities } from '../../const/const';
import { makeFakeCard } from '../../mocks/mocks';
import type { RootState } from '../../store/type';

vi.mock('../../components/tabs', () => ({
  default: vi.fn(() => <div data-testid="tabs">Tabs</div>),
}));

vi.mock('../../components/sort', () => ({
  default: vi.fn(() => <div data-testid="sort">Sort</div>),
}));

vi.mock('../../components/map', () => ({
  default: vi.fn(() => <div data-testid="map">Map</div>),
}));

vi.mock('../../components/offer', () => ({
  OfferListMemo: vi.fn(() => <div data-testid="offer-list">OfferList</div>),
  OffersCaptionMemo: vi.fn(() => <div data-testid="offers-caption">OffersCaption</div>),
}));

vi.mock('./main-empty', () => ({
  default: vi.fn(() => <div data-testid="main-empty">MainEmpty</div>),
}));

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...actual,
    useSearchParams: vi.fn(() => {
      const params = new URLSearchParams();
      const setParams = vi.fn();
      return [params, setParams];
    }),
  };
});

const mockOffers = [
  makeFakeCard({ cityKey: 'Paris' }),
  makeFakeCard({ cityKey: 'Paris', isFavorite: true }),
  makeFakeCard({ cityKey: 'Cologne' }),
];

const createTestStore = (preloadedState?: Partial<RootState>) => configureStore({
  reducer: {
    OFFERS: () => preloadedState?.OFFERS || { offers: [] },
    CITY: () => preloadedState?.CITY || { city: Cities.Paris },
  },
});

describe('MainPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render correctly with offers', () => {
    const store = createTestStore({
      OFFERS: {
        offers: mockOffers,
        isLoadingOffers: false,
        isErrorConnectionOffers: false,
      },
      CITY: {
        currentCity: Setting.DefaultCity
      }
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <HelmetProvider>
            <MainPage />
          </HelmetProvider>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('tabs')).toBeInTheDocument();
    expect(screen.getByTestId('sort')).toBeInTheDocument();
    expect(screen.getByTestId('offer-list')).toBeInTheDocument();
    expect(screen.getByTestId('offers-caption')).toBeInTheDocument();
    expect(screen.getByTestId('map')).toBeInTheDocument();
    expect(screen.queryByTestId('main-empty')).not.toBeInTheDocument();
  });

  it('should update URL when city changes', () => {
    const setParamsMock = vi.fn();
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams(),
      setParamsMock,
    ]);

    const store = createTestStore({
      OFFERS: {
        offers: mockOffers,
        isLoadingOffers: false,
        isErrorConnectionOffers: false,
      },
      CITY: {
        currentCity: Setting.DefaultCity
      }
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <HelmetProvider>
            <MainPage />
          </HelmetProvider>
        </MemoryRouter>
      </Provider>
    );

    expect(setParamsMock).toHaveBeenCalledWith({ city: Cities.Paris });
  });

  it('should set active card on hover', () => {
    const store = createTestStore({
      OFFERS: {
        offers: mockOffers,
        isLoadingOffers: false,
        isErrorConnectionOffers: false,
      },
      CITY: {
        currentCity: Setting.DefaultCity
      }
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <HelmetProvider>
            <MainPage />
          </HelmetProvider>
        </MemoryRouter>
      </Provider>
    );

    // Симулируем hover на карточке
    const offerList = screen.getByTestId('offer-list');
    const mouseEnterEvent = new MouseEvent('mouseenter', { bubbles: true });
    Object.defineProperty(mouseEnterEvent, 'target', {
      value: { dataset: { id: '1' } },
    });
    offerList.dispatchEvent(mouseEnterEvent);
  });
});
