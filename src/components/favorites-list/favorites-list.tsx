import { Link } from 'react-router-dom';
import useGroupedOffers from '../../hooks/use-grouped-offers/use-grouped-offers';
import { CardMemo } from '../offer';
import { FavoritesCardSize } from './const';

function FavoritesList(): JSX.Element {
  const groupedOffers = useGroupedOffers();
  return (
    <ul className="favorites__list">
      {Object.entries(groupedOffers).map(([cityName, cityOffers]) => (
        <li className="favorites__locations-items" key={cityName}>
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={`/?city=${cityName}`}>
                <span>{cityName}</span>
              </Link>
            </div>
          </div>
          <div className="favorites__places">
            {cityOffers.map((card) => (
              <CardMemo key={card.id} card={card} size={FavoritesCardSize} />
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default FavoritesList;
