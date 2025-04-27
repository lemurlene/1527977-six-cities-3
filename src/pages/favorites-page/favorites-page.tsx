import { Helmet } from 'react-helmet-async';
import cn from 'classnames';
import { useAppSelector } from '../../hooks';
import { selectFavoriteOffersCount } from '../../store/favorites/favorites.selector';
import FavoritesEmpty from './favorites-empty';
import FavoritesList from '../../components/favorites-list';

function FavoritesPage(): JSX.Element {
  const offersLength = useAppSelector(selectFavoriteOffersCount);
  const isEmpty = offersLength === 0;

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
                <FavoritesList />
              </section>
            </div>
          </main>)}
      </div >
    </>
  );
}

export default FavoritesPage;

