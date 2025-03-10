import { ReactEventHandler } from 'react';

type ChangeHandler = ReactEventHandler<HTMLInputElement>;

type InputProps = {
  ratingValue: number;
  title: string;
  onChange: ChangeHandler;
}

function InputRating({ ratingValue, title, onChange }: InputProps): JSX.Element {
  return (
    <>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        value={ratingValue}
        id={`${ratingValue}-stars`}
        type="radio"
        onChange={onChange}
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
