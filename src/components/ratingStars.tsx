import { Setting } from '../const';

type GetRatingStarsProps = {
  rating: number;
  isPreview: boolean;
}

function RatingStars({ rating, isPreview = true }: GetRatingStarsProps): JSX.Element {
  const getRatingStars = Math.round(rating) * Setting.RatingsCoefficient;

  return (
    <div className={`rating ${isPreview ? 'place-card__rating' : 'offer__rating'}`}>
      {/* <div className="reviews__rating rating"> */}
      <div className={`rating__stars ${isPreview ? 'place-card__stars' : 'offer__stars'}`}>
        {/* <div className="reviews__stars rating__stars"> */}
        <span style = {{ width: `${getRatingStars}%` }}></span>
        <span className="visually-hidden">Rating</span>
      </div >
      {!isPreview && (
        <span className="offer__rating-value rating__value">{rating}</span>
      )}
    </div >
  );
}

export default RatingStars;
