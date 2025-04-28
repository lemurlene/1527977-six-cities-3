import { Helmet } from 'react-helmet-async';
import { useState, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Nullable } from 'vitest';
import cn from 'classnames';
import { useAppSelector } from '../../hooks';
import { selectOffers } from '../../store/offers/offers.selector';
import { selectCurrentCity } from '../../store/city/city.selector';
import TabsMemo from '../../components/tabs';
import MainEmpty from './main-empty';
import SortMemo from '../../components/sort';
import Map from '../../components/map';
import { OfferListMemo, OffersCaptionMemo } from '../../components/offer';
import { CityLocation } from '../../const/const';

function MainPage(): JSX.Element {
  const offersAll = useAppSelector(selectOffers);
  const currentCityName = useAppSelector(selectCurrentCity);

  const currentOffers = useMemo(
    () => offersAll.filter((offer) => offer.city.name === currentCityName),
    [offersAll, currentCityName]
  );

  const isEmpty = useMemo(
    () => currentOffers.length === 0,
    [currentOffers]
  );

  const currentCityLocation = useMemo(
    () => CityLocation[currentCityName as keyof typeof CityLocation],
    [currentCityName]
  );

  const [activeCardId, setActiveCardId] = useState<Nullable<string>>(null);
  const onHandleHover = useCallback(
    (cardId?: string | null) => {
      setActiveCardId(currentOffers.find((offer) => offer.id === cardId)?.id ?? null);
    },
    [currentOffers]
  );

  const [searchParams, setSearchParams] = useSearchParams();
  useMemo(() => {
    if (!searchParams.get('city')) {
      setSearchParams({ city: currentCityName });
    }
  }, [currentCityName, searchParams, setSearchParams]);

  const mainClasses = useMemo(
    () => cn('page__main page__main--index', { 'page__main--index-empty': isEmpty }),
    [isEmpty]
  );

  const placesContainerClasses = useMemo(
    () => cn('cities__places-container container', { 'cities__places-container--empty': isEmpty }),
    [isEmpty]
  );

  return (
    <>
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <main className={mainClasses}>
        <h1 className="visually-hidden">Cities</h1>
        <TabsMemo />
        <div className="cities">
          <div className={placesContainerClasses} >
            {isEmpty && <MainEmpty currentCity={currentCityName} />}
            {!isEmpty && (
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <OffersCaptionMemo offersCount={currentOffers.length} cityName={currentCityName} />
                <SortMemo />
                <OfferListMemo offers={currentOffers} handleHover={onHandleHover} />
              </section>)}
            <div className="cities__right-section">
              {!isEmpty && <Map city={currentCityLocation} offers={currentOffers} selectedOfferId={activeCardId} />}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default MainPage;
