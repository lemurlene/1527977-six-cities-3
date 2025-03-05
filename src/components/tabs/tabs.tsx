import { NavLink, useLocation } from 'react-router-dom';
import { Cities } from '../../const/const';
import { getClassForNavLink } from './utils';

function Tabs(): JSX.Element {
  const { pathname } = useLocation();
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {Object.values(Cities).map((city) => (
            <li className="locations__item" key={city}>
              <NavLink className={getClassForNavLink} to={`${pathname}?tab=${city}`}>
                <span>{city}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Tabs;
