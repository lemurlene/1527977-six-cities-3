import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Nullable } from 'vitest';
import cn from 'classnames';
import FavoritesEmpty from './favorites-empty';
import { Card } from '../../components/offer';
import { CardType } from '../../const/type';

type GetCardsProps = {
  offers: CardType[];
}

function FavoritesPage({ offers }: GetCardsProps): JSX.Element {
  const [activeCardId, setActiveCardId] = useState<Nullable<string>>(null);
  const handleHover = (id: string | null) => {
    setActiveCardId(id || null);
  };

  useEffect(() => {
    // console.log(activeCardId);
  }, [activeCardId]);

  const isEmpty = offers.length === 0;
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
                  {offers.map((card) => (
                    <li className="favorites__locations-items" key={card.id}>
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <Link className="locations__item-link" to="/">
                            <span>{card.city.name}</span>
                          </Link>
                        </div>
                      </div>
                      <div className="favorites__places">
                        <Card card={card} handleHover={handleHover} />
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

