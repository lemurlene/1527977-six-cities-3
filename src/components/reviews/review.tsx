import RatingStars from '../rating-stars';
import { ReviewType } from '../../const/type';
import { formatedDate } from './utils';

function Review(review: ReviewType): JSX.Element {
  const {
    date,
    user: {
      name,
      avatarUrl
    },
    comment,
    rating
  } = review;
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img data-testid="avatar"
            className="reviews__avatar user__avatar"
            src={avatarUrl}
            width="54"
            height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{name}</span>
      </div>
      <div className="reviews__info">
        <RatingStars rating={rating} classPrefix='reviews' />
        <p className="reviews__text">{comment}</p>
        <time className="reviews__time" dateTime={date}>
          {formatedDate(date)}
        </time>
      </div>
    </li>
  );
}

export default Review;
