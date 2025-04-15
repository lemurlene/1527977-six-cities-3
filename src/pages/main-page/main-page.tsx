import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Nullable } from 'vitest';
import cn from 'classnames';
import { store } from '../../store';
import { useAppSelector } from '../../hooks/store';
import { selectOffers, selectCity } from '../../store/selectors/offers';
import { fetchOffers } from '../../store/api-action';
import Tabs from '../../components/tabs';
import MainEmpty from './main-empty';
import Sort from '../../components/sort';
import Map from '../../components/map';
import { OfferList } from '../../components/offer';
import { CityLocation } from '../../const/const';

type OfferListProps = {
  cardsCount: number;
}

store.dispatch(fetchOffers());

function MainPage({ cardsCount }: OfferListProps): JSX.Element {
  const offersAll = useAppSelector(selectOffers);
  const currentCityName = useAppSelector(selectCity);
  const currentOffers = offersAll.filter((offer) => offer.city.name === currentCityName);
  const isEmpty = currentOffers.length === 0;
  const currentCityLocation = CityLocation[currentCityName as keyof typeof CityLocation];

  const [activeCardId, setActiveCardId] = useState<Nullable<string>>(null);
  const onHandleHover = (cardId?: string | null) => {
    const currentCard = currentOffers.find((offer) =>
      offer.id.toString() === cardId);
    setActiveCardId(currentCard?.id);
  };

  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    if (!searchParams.get('city')) {
      setSearchParams({ city: currentCityName });
    }
  }, [currentCityName, searchParams, setSearchParams]);

  return (
    <>
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <main className={cn('page__main page__main--index', {'page__main--index-empty' : isEmpty})}>
        <h1 className="visually-hidden">Cities</h1>
        <Tabs />
        <div className="cities">
          <div className={cn('cities__places-container container',{'cities__places-container--empty' : isEmpty})} >
            {isEmpty && <MainEmpty currentCity={currentCityName} />}
            {!isEmpty && (
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{`${currentOffers.length} places to stay in ${currentCityName}`}</b>
                <Sort />
                <OfferList offers={currentOffers} cardsCount={cardsCount} handleHover={onHandleHover} />
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
