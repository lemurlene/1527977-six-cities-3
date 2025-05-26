import { ChangeEvent, FormEvent, useCallback, useMemo, useState } from 'react';
import InputRating from './input-rating';
import TextareaRating from './textarea-rating';
import ButtonSubmit from './button-submit';
import { FormReviewFields, ReviewSize } from './const';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { postOfferComment } from '../../../store/api-action';
import { selectCommentStatus } from '../../../store/reviews/reviews.selector';
import { useId } from '../../../utils';
import ErrorMessage from '../../error-message';

const initialState = {
  rating: 0,
  review: '',
};

function FormReview(): JSX.Element {
  const dispatch = useAppDispatch();
  const isCommentSending = useAppSelector(selectCommentStatus);
  const offerId = useId();
  const [reviewData, setRewiew] = useState(initialState);
  const [, setSubmitError] = useState<string | null>(null);

  const isButtonDisabled = useMemo(
    () =>
      reviewData.review.length < ReviewSize.MinCharacters ||
      reviewData.review.length > ReviewSize.MaxCharacters ||
      reviewData.rating === 0 ||
      isCommentSending,
    [reviewData, isCommentSending]
  );

  const handleChange = useCallback(
    (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = evt.target;
      setRewiew((prev) => ({
        ...prev,
        [name]: name === 'rating' ? Number(value) : value,
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    (evt: FormEvent<HTMLFormElement>) => {
      evt.preventDefault();
      setSubmitError(null);
      if (!offerId || isButtonDisabled) {
        return;
      }
      dispatch(
        postOfferComment({
          id: offerId,
          comment: reviewData,
        })
      )
        .then((response) => {
          if (response.meta.requestStatus === 'fulfilled') {
            setRewiew(initialState);
          }
        })
        .catch((error: Error) => {
          setSubmitError(
            error instanceof Error
              ? error.message
              : 'Неизвестная ошибка при отправке'
          );
        });
    },
    [dispatch, offerId, isButtonDisabled, reviewData]
  );

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
      data-testid="review-form"
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {FormReviewFields.map((field) => (
          <InputRating key={field.ratingValue}
            {...field}
            onChange={handleChange}
            isDisabled={isCommentSending}
            checked={reviewData.rating === field.ratingValue}
          />
        ))}
      </div>
      <TextareaRating
        review={reviewData.review}
        onChange={handleChange}
        isDisabled={isCommentSending}
      />
      <ButtonSubmit isDisabled={isButtonDisabled} />
      <ErrorMessage />
    </form>
  );
}

export default FormReview;
