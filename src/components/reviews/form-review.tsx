import InputRating from './input-rating';
import { FormReviewFields, Setting } from '../../const/const';
import { ReactEventHandler, useState } from 'react';

type ChangeHandler = ReactEventHandler<HTMLTextAreaElement | HTMLInputElement>;

function FormReview(): JSX.Element {
  const [review, setRewiew] = useState({ rating: 0, review: '' });
  const handleChange: ChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    setRewiew({ ...review, [name]: value });
  };

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {FormReviewFields.map((field) => (
          <InputRating key={field.ratingValue} {...field} onChange={handleChange} />
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleChange}
        defaultValue={''}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set
          <span className="reviews__star">
            rating
          </span>
          and describe your stay with at least
          <b className="reviews__text-amount">
            {Setting.MinReviewCharacters} characters
          </b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={review.review.length < Setting.MinReviewCharacters || review.rating === 0}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default FormReview;
