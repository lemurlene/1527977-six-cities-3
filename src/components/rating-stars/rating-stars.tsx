import { useLocation } from 'react-router-dom';
import { AppRoute } from '../../const/enum';
import { Setting } from '../../const/const';
import { getState } from './utils';

type GetRatingStarsProps = {
  rating: number;
}

function RatingStars({ rating }: GetRatingStarsProps): JSX.Element {
  const getRatingStars = Math.round(rating) * Setting.RatingsCoefficient;
  const { pathname } = useLocation();
  const { placeClassPrefix, shouldRenderValue } = getState(pathname as AppRoute);

  return (
    <div className={`rating ${placeClassPrefix}__rating`}>
      <div className={`rating__stars ${placeClassPrefix}__stars`}>
        <span style = {{ width: `${getRatingStars}%` }}></span>
        <span className="visually-hidden">Rating</span>
      </div >
      {shouldRenderValue && (
        <span className="offer__rating-value rating__value">{rating}</span>
      )}
    </div >
  );
}

export default RatingStars;
