import { Helmet } from 'react-helmet-async';
import Spinner from '../../components/spinner';

function LoadingPage(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>6 cities: Page loading</title>
      </Helmet>
      <main className="page__main page__main--index page__main--index-empty" data-testid="loading-page">
        <h1 className="visually-hidden">Page loading</h1>
        <div className="cities">
          <div className="cities__places-container container cities__places-container--empty">
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">Loading...</b>
                <Spinner />
              </div>
            </section>
            <div className="cities__right-section"></div>
          </div>
        </div >
      </main >
    </>
  );
}

export default LoadingPage;
