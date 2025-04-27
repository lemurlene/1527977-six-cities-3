import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/enum';

type ErrorServerProps = {
  mainPage?: boolean;
}

function ErrorServer({mainPage = false}:ErrorServerProps): JSX.Element | null {
  return (
    <>
      <Helmet>
        <title>6 cities: Error server</title>
      </Helmet>
      <main className="page__main page__main--index page__main--index-empty">
        <h1 className="visually-hidden">Error server</h1>
        <div className="cities">
          <div className="cities__places-container container cities__places-container--empty">
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">Что-то пошло не так. Попробуйте перезагрузить страницу.</b>
                {!mainPage &&
                  <Link to={AppRoute.Root} className='tabs__item--active locations__item-link'>
                    Вернуться на главную
                  </Link>}
              </div>
            </section>
            <div className="cities__right-section"></div>
          </div>
        </div >
      </main >
    </>
  );
}

export default ErrorServer;
