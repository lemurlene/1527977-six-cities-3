import { useEffect, useState, useRef } from 'react';
import leaflet, { Map as LeafletMap } from 'leaflet';
import { TILE_LAYER_URL_PATTERN, TILE_LAYER_ATTRIBUTION } from './const';

type UseMapProps = {
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  containerRef: React.RefObject<HTMLElement | null>;
}

export const useMap = ({ location, containerRef }: UseMapProps): LeafletMap | null => {
  const [map, setMap] = useState<LeafletMap | null> (null);
  const isRenderedRef = useRef(false);

  useEffect((): void => {
    if (containerRef.current !== null && !isRenderedRef.current) {
      const instance = leaflet.map(containerRef.current, {
        center: {
          lat: location.latitude,
          lng: location.longitude,
        },
        zoom: location.zoom,
      });

      leaflet
        .tileLayer(TILE_LAYER_URL_PATTERN, {
          attribution: TILE_LAYER_ATTRIBUTION
        })
        .addTo(instance);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [containerRef, location]);

  return map;
};
