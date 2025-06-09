import { ReviewSize } from './const';

type ButtonSubmitProps = {
  isDisabled: boolean;
}

function ButtonSubmit({ isDisabled }: ButtonSubmitProps): JSX.Element {
  return (
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
        disabled={isDisabled}
      >
        Submit
      </button>
    </div>
  );
}

export default ButtonSubmit;
