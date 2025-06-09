import React, { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import leaflet, { LayerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { AppRoute } from '../../const/enum';
import { getState } from './utils';
import useMap from '../../hooks/use-map/';
import { CardType, OfferType } from '../../const/type';
import { currentCustomIcon, defaultCustomIcon } from './const';

type MapProps = {
  city: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  offers: (CardType | OfferType)[];
  selectedOfferId?: string | null;
}

export const Map: React.FC<MapProps> = ({ city, offers, selectedOfferId }): JSX.Element => {
  const { pathname } = useLocation();
  const { rootClassPrefix } = getState(pathname as AppRoute);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const map = useMap({ location: city, containerRef: mapContainerRef });
  const markerLayer = useRef<LayerGroup>(leaflet.layerGroup());

  useEffect(() => {
    if (map) {
      map.setView([city.latitude, city.longitude], city.zoom);
      markerLayer.current.addTo(map);
      markerLayer.current.clearLayers();
    }
  }, [city, map]);

  useEffect((): void => {
    if (map) {
      offers.forEach((offer): void => {
        leaflet
          .marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          }, {
            icon: offer.id === selectedOfferId
              ? currentCustomIcon
              : defaultCustomIcon,
          })
          .addTo(markerLayer.current);
      });
    }
  }, [selectedOfferId, map, offers]);

  return <section className={`map ${rootClassPrefix}__map`} ref={mapContainerRef} />;
};
