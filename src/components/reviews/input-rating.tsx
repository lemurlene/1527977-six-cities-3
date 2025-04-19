import { ChangeEvent } from 'react';
import { selectCommentSending } from '../../store/selectors/offer';
import { useAppSelector } from '../../hooks';

type InputProps = {
  ratingValue: number;
  title: string;
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
}

function InputRating({ ratingValue, title, onChange }: InputProps): JSX.Element {
  const isCommentSending = useAppSelector(selectCommentSending);
  return (
    <>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        value={ratingValue}
        id={`${ratingValue}-stars`}
        type="radio"
        onChange={onChange}
        disabled={isCommentSending}
      />
      <label
        htmlFor={`${ratingValue}-stars`}
        className="reviews__rating-label form__rating-label"
        title={title}
      >
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>
  );
}

export default InputRating;
