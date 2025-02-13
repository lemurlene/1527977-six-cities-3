import Header from '../components/header/header';
import Tabs from '../components/tabs';
import MainEmpty from '../components/main-empty';
import Sort from '../components/sort';
import Card from '../components/offer/card';
import Map from '../components/map';
import { Setting } from '../const';
import { CardType } from '../type';

const currentCity = Setting.DefaultCity;

type GetCardsProps = {
  cardsCount: number;
  offers: CardType[];
}

function MainPage({ offers, cardsCount }: GetCardsProps): JSX.Element {
  const isEmpty = offers.length === 0;
  return (
    <div className="page page--gray page--main">
      <Header />
      <main className={`page__main page__main--index ${isEmpty ? 'page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <Tabs />
        <div className="cities">
          <div className={`cities__places-container container ${isEmpty ? 'cities__places-container--empty' : ''}`} >
            {isEmpty ? (<MainEmpty />) : (
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{`${offers.length} places to stay in ${currentCity}`}</b>
                <Sort />
                <div className="cities__places-list places__list tabs__content">
                  {offers.slice(0, cardsCount).map((card) => (<Card key={card.id} {...card} />))}
                </div>
              </section>)}
            {!isEmpty && (
              <div className="cities__right-section">
                <Map />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
