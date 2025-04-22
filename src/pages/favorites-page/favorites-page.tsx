import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Nullable } from 'vitest';
import cn from 'classnames';
import FavoritesEmpty from './favorites-empty';
import { CardMemo } from '../../components/offer';
import { CardType } from '../../const/type';
import { FavoritesCardSize } from './const';

type GetCardsProps = {
  offers: CardType[];
}

function FavoritesPage({ offers }: GetCardsProps): JSX.Element {
  const [activeCardId, setActiveCardId] = useState<Nullable<string>>(null);
  const handleHover = (id: string | null) => {
    setActiveCardId(id || null);
  };

  useEffect(() => {
  }, [activeCardId]);

  const isEmpty = offers.length === 0;
  const groupedOffers = offers.reduce<Record<string, CardType[]>>((acc, offer) => {
    const cityName = offer.city.name;
    if (!acc[cityName]) {
      acc[cityName] = [];
    }
    acc[cityName].push(offer);
    return acc;
  }, {});

  return (
    <>
      <Helmet>
        <title>6 cities: favorites</title>
      </Helmet>
      <div className={cn('page', { 'page--favorites-empty': isEmpty })}>
        {isEmpty && <FavoritesEmpty />}
        {!isEmpty && (
          <main className="page__main page__main--favorites">
            <div className="page__favorites-container container">
              <section className="favorites">
                <h1 className="favorites__title">Saved listing</h1>
                <ul className="favorites__list">
                  {Object.entries(groupedOffers).map(([cityName, cityOffers]) => (
                    <li className="favorites__locations-items" key={cityName}>
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <Link className="locations__item-link" to={`/?city=${cityName}`}>
                            <span>{cityName}</span>
                          </Link>
                        </div>
                      </div>
                      <div className="favorites__places">
                        {cityOffers.map((card) => (
                          <CardMemo key={card.id} card={card} handleHover={handleHover} size={FavoritesCardSize} />
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </main>)}
      </div >
    </>
  );
}

export default FavoritesPage;

