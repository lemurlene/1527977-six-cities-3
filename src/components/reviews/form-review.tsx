import InputRating from './input-rating';
import { FormReviewFields, ReviewSize, PLACEHOLDER } from './const';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postOfferComment } from '../../store/api-action';
import { selectCommentSending } from '../../store/selectors/offer';
import { useId } from '../../utils';

function FormReview(): JSX.Element {

  const initialState = {
    rating: 0,
    review: '',
  };

  const dispatch = useAppDispatch();
  const isCommentSending = useAppSelector(selectCommentSending);
  const offerId = useId();
  const [reviewData, setRewiew] = useState(initialState);

  const isButtonDisabled =
    reviewData.review.length < ReviewSize.MinCharacters ||
    reviewData.review.length > ReviewSize.MaxCharacters ||
    reviewData.rating === 0 ||
    isCommentSending;

  const handleChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = evt.target;
    setRewiew((prev) => ({
      ...prev,
      [name]: name === 'rating' ? Number(value) : value,
    }));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (!offerId || isButtonDisabled) {
      return;
    }

    dispatch(postOfferComment({
      id: offerId,
      comment: reviewData
    }))
      .then((response) => {
        if (response.meta.requestStatus === 'fulfilled') {
          setRewiew(initialState);
        }
      });
  };

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
    >
      <fieldset
        disabled={isCommentSending}
        aria-busy={isCommentSending}
        style={{ border: 'none' }}
      >
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
          placeholder={PLACEHOLDER}
          onChange={handleChange}
          defaultValue={''}
        >
        </textarea>
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set&thinsp;
            <span className="reviews__star">
              rating
            </span>
            and describe your stay with at least&thinsp;
            <b className="reviews__text-amount">
              {ReviewSize.MinCharacters} characters
            </b>.
          </p>
          <button
            className="reviews__submit form__submit button"
            type="submit"
            disabled={isButtonDisabled}
          >
            Submit
          </button>
        </div>
      </fieldset>
    </form>
  );
}

export default FormReview;
