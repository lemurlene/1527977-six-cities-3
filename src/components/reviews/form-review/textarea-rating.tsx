import { ChangeEvent } from 'react';
import { ReviewSize, PLACEHOLDER } from './const';

type TextareaProps = {
  review: string;
  onChange: (evt: ChangeEvent<HTMLTextAreaElement>) => void;
  isDisabled: boolean;
}

function TextareaRating({ review, onChange, isDisabled }: TextareaProps): JSX.Element {
  return (
    <textarea
      className="reviews__textarea form__textarea"
      id="review"
      name="review"
      placeholder={PLACEHOLDER}
      onChange={onChange}
      minLength={ReviewSize.MinCharacters}
      maxLength={ReviewSize.MaxCharacters}
      required
      disabled={isDisabled}
      value={review}
    />
  );
}

export default TextareaRating;
