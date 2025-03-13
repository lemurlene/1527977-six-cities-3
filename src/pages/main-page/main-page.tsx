import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { Nullable } from 'vitest';
import cn from 'classnames';
import Tabs from '../../components/tabs';
import MainEmpty from './main-empty';
import Sort from '../../components/sort';
import { OfferList } from '../../components/offer';
import Map from '../../components/map';
import { DefaultCity } from '../../const/const';
import { CardType } from '../../const/type';

const currentCityName = DefaultCity.name;

type OfferListProps = {
  cardsCount: number;
  offers: CardType[];
}

function MainPage({ offers, cardsCount }: OfferListProps): JSX.Element {
  const isEmpty = offers.length === 0;
  const [activeCardId, setActiveCardId] = useState<Nullable<string>>(null);
  const onHandleHover = (cardId?: string | null) => {
    const currentCard = offers.find((offer) =>
      offer.id.toString() === cardId);
    setActiveCardId(currentCard?.id);
  };

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
            {isEmpty && <MainEmpty />}
            {!isEmpty && (
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{`${offers.length} places to stay in ${currentCityName}`}</b>
                <Sort />
                <OfferList offers={offers} cardsCount={cardsCount} handleHover={onHandleHover} />
              </section>)}
            <div className="cities__right-section">
              {!isEmpty && <Map city={DefaultCity} offers={offers} selectedOfferId={activeCardId} />}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default MainPage;
