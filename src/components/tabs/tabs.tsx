import { NavLink, useSearchParams } from 'react-router-dom';
import { MouseEvent, memo, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeCity } from '../../store/action';
import { selectCity } from '../../store/selectors/offers';
import { Cities } from '../../const/const';
import { CitiesEnum } from '../../const/type';
import { getClassForNavLink } from './utils';

const Tabs = (): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector(selectCity);

  const handleCityChange = useCallback(
    (city: CitiesEnum) => (evt: MouseEvent<HTMLAnchorElement>) => {
      evt.preventDefault();
      if (city !== currentCity) {
        dispatch(changeCity(city));
        setSearchParams({ city });
      }
    },
    [currentCity, dispatch, setSearchParams]
  );

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {Object.values(Cities).map((city) => (
            <li className="locations__item" key={city}>
              <NavLink
                to={`?city=${city}`}
                className={({ isActive }) =>
                  getClassForNavLink({
                    isActive: isActive && searchParams.get('city') === city
                  })}
                onClick={handleCityChange(city)}
                end
              >
                <span>{city}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

const TabsMemo = memo(Tabs);

export default TabsMemo;
