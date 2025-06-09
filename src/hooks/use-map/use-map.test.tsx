import { renderHook } from '@testing-library/react';
import { useMap } from './use-map';
import leaflet from 'leaflet';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { TILE_LAYER_URL_PATTERN, TILE_LAYER_ATTRIBUTION } from './const';

vi.mock('leaflet', () => ({
  __esModule: true,
  default: {
    map: vi.fn(() => ({
      setView: vi.fn(),
    })),
    tileLayer: vi.fn(() => ({
      addTo: vi.fn(),
    })),
  },
}));

describe('useMap hook', () => {
  const mockLocation = {
    latitude: 52.370216,
    longitude: 4.895168,
    zoom: 10,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize map when container ref is available', () => {
    const mockContainer = document.createElement('div');
    const { result } = renderHook(() =>
      useMap({
        location: mockLocation,
        containerRef: { current: mockContainer },
      })
    );

    expect(leaflet.map).toHaveBeenCalledTimes(1);
    expect(leaflet.map).toHaveBeenCalledWith(mockContainer, {
      center: {
        lat: mockLocation.latitude,
        lng: mockLocation.longitude,
      },
      zoom: mockLocation.zoom,
    });

    expect(leaflet.tileLayer).toHaveBeenCalledTimes(1);
    expect(result.current).toBeTruthy();
  });

  it('should not initialize map when container ref is null', () => {
    const { result } = renderHook(() =>
      useMap({
        location: mockLocation,
        containerRef: { current: null },
      })
    );

    expect(leaflet.map).not.toHaveBeenCalled();
    expect(result.current).toBeNull();
  });

  it('should initialize map only once', () => {
    const mockContainer = document.createElement('div');
    const { rerender } = renderHook(
      ({ location, containerRef }) => useMap({ location, containerRef }),
      {
        initialProps: {
          location: mockLocation,
          containerRef: { current: mockContainer },
        },
      }
    );

    rerender({
      location: { ...mockLocation, zoom: 12 },
      containerRef: { current: mockContainer },
    });

    expect(leaflet.map).toHaveBeenCalledTimes(1);
  });

  it('should set up tile layer with correct parameters', () => {
    const mockContainer = document.createElement('div');
    renderHook(() =>
      useMap({
        location: mockLocation,
        containerRef: { current: mockContainer },
      })
    );

    expect(leaflet.tileLayer).toHaveBeenCalledWith(
      TILE_LAYER_URL_PATTERN,
      {
        attribution: TILE_LAYER_ATTRIBUTION
      }
    );
  });
});
