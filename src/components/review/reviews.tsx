import Review from './review';
import FormReview from './form-review';
import { ReviewType } from '../../type';

const isLogin = true;

type GetReviewProps = {
  comments: ReviewType[];
}

function Reviews({comments}: GetReviewProps): JSX.Element {
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
      {!isLogin && <FormReview />}
    </section>
  );
}

export default Reviews;
