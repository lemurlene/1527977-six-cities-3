import { Cities, Setting } from '../const';
const defaultCity = Setting.DefaultCity;

function Tabs(): JSX.Element {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {Object.values(Cities).map((city) => (
            <li className="locations__item" key={city}>
              <a
                className={`locations__item-link tabs__item ${city === defaultCity ? 'tabs__item--active' : ''}`}
                href={city === defaultCity ? undefined : '#'}
              >
                <span>{city}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Tabs;
