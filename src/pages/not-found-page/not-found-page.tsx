import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { style } from './style';

function NotFoundPage(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>6 cities: Page not found</title>
      </Helmet>
      <main className="page__main page__main--index page__main--index-empty">
        <h1 className="visually-hidden">404 Page not found</h1>
        <div className="cities">
          <div className="cities__places-container container cities__places-container--empty">
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">404 Page not found</b>
                <Link to="/" style={style}>
                  Вернуться на главную
                </Link>
              </div>
            </section>
            <div className="cities__right-section"></div>
          </div>
        </div >
      </main >
    </>
  );
}

export default NotFoundPage;
