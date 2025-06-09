import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import FormLogin from '../../components/form-login';
import { getRandomCity } from './utils';
import { CitiesEnum } from '../../const/type';

function LoginPage(): JSX.Element {
  const navigate = useNavigate();
  const randomCity = getRandomCity();
  const handleCityClick = (city: CitiesEnum) => {
    navigate(`/?city=${city}`);
  };
  return (
    <>
      <Helmet>
        <title>6 cities: authorization</title>
      </Helmet>
      <main className="page__main page__main--login" data-testid="login-page">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <FormLogin />
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                className="locations__item-link"
                to={`/?city=${randomCity}`}
                onClick={() => handleCityClick(randomCity)}
              >
                <span>{randomCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default LoginPage;
