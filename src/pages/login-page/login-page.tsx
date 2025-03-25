import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import FormLogin from '../../components/form-login';
import { DefaultCity } from '../../const/const';

const currentCity = DefaultCity.name;

function LoginPage(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>6 cities: authorization</title>
      </Helmet>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <FormLogin />
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to="/">
                <span>{currentCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default LoginPage;
