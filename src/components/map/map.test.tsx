import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { useLocation } from 'react-router-dom';
import type { PathPattern } from 'react-router-dom';
import { Map } from './map';
import { CardType, OfferType } from '../../const/type';
import type { Map as LeafletMap } from 'leaflet';

const mockLeafletMap = {
  setView: vi.fn(),
  getRenderer: vi.fn(),
  addControl: vi.fn(),
  removeControl: vi.fn(),
  addLayer: vi.fn(),
} as unknown as LeafletMap;

vi.mock('leaflet', () => ({
  __esModule: true,
  default: {
    layerGroup: vi.fn(() => ({
      addTo: vi.fn(),
      clearLayers: vi.fn(),
    })),
    marker: vi.fn(() => ({
      addTo: vi.fn(),
    })),
    icon: vi.fn(),
    map: vi.fn(() => mockLeafletMap),
  },
}));

vi.mock('../../hooks/use-map', () => ({
  default: vi.fn(() => mockLeafletMap),
}));

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...actual,
    useLocation: vi.fn(() => ({
      pathname: '/',
      search: '',
      hash: '',
      state: null,
      key: 'testKey',
    })),
    matchPath: vi.fn((_pattern: string | PathPattern<string>, pathname: string) =>
      pathname.startsWith('/offer/') ? {
        params: { id: '1' },
        pathname: '/offer/1',
        pathnameBase: '/offer/1',
        pattern: { path: '/offer/:id', end: true, caseSensitive: false }
      } : null
    ),
  };
});

describe('Map Component', () => {
  const mockCity = {
    latitude: 52.370216,
    longitude: 4.895168,
    zoom: 10,
  };
  const mockOffers = [
    {
      id: '1',
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
      },
    },
  ] as (CardType | OfferType)[];

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useLocation).mockReturnValue({
      pathname: '/',
      search: '',
      hash: '',
      state: null,
      key: 'testKey',
    });
  });

  it('should render map container with correct class for main page', () => {
    const { container } = render(
      <Map city={mockCity} offers={mockOffers} />
    );

    const mapElement = container.querySelector('.map');
    expect(mapElement).toBeInTheDocument();
    expect(mapElement).toHaveClass('map');
    expect(mapElement).toHaveClass('cities__map');
  });

  it('should render with offer class prefix on offer page', () => {
    vi.mocked(useLocation).mockReturnValue({
      pathname: '/offer/1',
      search: '',
      hash: '',
      state: null,
      key: 'testKey',
    });

    const { container } = render(
      <Map city={mockCity} offers={mockOffers} />
    );

    const mapElement = container.querySelector('.map');
    expect(mapElement).toHaveClass('map');
    expect(mapElement).toHaveClass('offer__map');
  });

  it('should update map view when city changes', () => {
    const { rerender } = render(
      <Map city={mockCity} offers={mockOffers} />
    );

    const newCity = {...mockCity, latitude: 53.123};
    rerender(<Map city={newCity} offers={mockOffers} />);

    expect(mockLeafletMap.setView).toHaveBeenCalledWith(
      [newCity.latitude, newCity.longitude],
      newCity.zoom
    );
  });
});
