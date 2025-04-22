import { memo } from 'react';
import { getRatingStars } from './utils';

type GetRatingStarsProps = {
  rating: number;
  classPrefix: string;
  isOffer?: boolean;
}

function RatingStars({ rating, classPrefix, isOffer }: GetRatingStarsProps): JSX.Element {
  const ratingStars = getRatingStars(rating);
  return (
    <div className={`rating ${classPrefix}__rating`}>
      <div className={`rating__stars ${classPrefix}__stars`}>
        <span style = {{ width: `${ratingStars}%` }}></span>
        <span className="visually-hidden">Rating</span>
      </div >
      {isOffer && (
        <span className="offer__rating-value rating__value">{rating}</span>
      )}
    </div >
  );
}

const RatingStarsMemo = memo(RatingStars);

export default RatingStarsMemo;
