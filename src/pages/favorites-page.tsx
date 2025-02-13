import Header from '../components/header/header';
import FavoritesEmpty from '../components/favorites-empty';
import Card from '../components/offer/card';
import Footer from '../components/footer';
import { CardType } from '../type';

type GetCardsProps = {
  offers: CardType[];
}

function FavoritesPage({ offers }: GetCardsProps): JSX.Element {
  const isEmpty = offers.length === 0;
  return (
    <div className={`page ${isEmpty ? 'page--favorites-empty' : ''} `}>
      <Header />
      {isEmpty ? (<FavoritesEmpty />) : (
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {offers.map((card) => (
                  <li className="favorites__locations-items" key={card.id}>
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#">
                          {/* <span>{city.name}</span> */}
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">
                      <Card {...card} />
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </main>)}
      < Footer />
    </div >
  );
}

export default FavoritesPage;
