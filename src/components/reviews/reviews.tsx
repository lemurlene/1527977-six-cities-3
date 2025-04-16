import Review from './review';
import FormReview from './form-review';
import { ReviewType, AuthorizationEnum } from '../../const/type';
import { AuthorizationStatus } from '../../const/enum';

type GetReviewProps = {
  comments: ReviewType[];
  authorizationStatus: AuthorizationEnum;
}

function Reviews({comments, authorizationStatus }: GetReviewProps): JSX.Element {
  const isAuthenticated = authorizationStatus === AuthorizationStatus.Auth;
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot;
        <span className="reviews__amount">{comments.length}</span>
      </h2>
      <ul className="reviews__list">
        {comments.map((review) => (
          <Review key={review.id} {...review} />
        ))}
      </ul>
      {isAuthenticated && <FormReview />}
    </section>
  );
}

export default Reviews;
