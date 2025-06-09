import dayjs from 'dayjs';
import Review from './review';
import FormReview from './form-review';
import { ReviewType, AuthorizationEnum } from '../../const/type';
import { AuthorizationStatus } from '../../const/enum';
import { SHOW_REVIEWS_COUNT } from './const';

type GetReviewProps = {
  comments: ReviewType[];
  authorizationStatus: AuthorizationEnum;
}

function Reviews({ comments, authorizationStatus }: GetReviewProps): JSX.Element {
  const isAuthenticated = authorizationStatus === AuthorizationStatus.Auth;
  const latestReviews = [...comments].sort((a: ReviewType, b: ReviewType) =>
    dayjs(b.date).diff(dayjs(a.date))
  ).slice(0, SHOW_REVIEWS_COUNT);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot;
        <span className="reviews__amount">{comments.length}</span>
      </h2>
      <ul className="reviews__list">
        {latestReviews.map((review) => (
          <Review key={review.id} {...review} />
        ))}
      </ul>
      {isAuthenticated && <FormReview />}
    </section>
  );
}

export default Reviews;
