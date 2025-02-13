import { CardType } from '../../type';
import RatingStars from '../ratingStars';

function Card(card: CardType): JSX.Element {
  const {
    id,
    title,
    type,
    price,
    previewImage,
    isFavorite,
    isPremium,
    rating,
  } = card;

  return (
    <article className="cities__card place-card">
      {/* <article className="favorites__card place-card"> */}
      {/* <article className="near-places__card place-card"> */}
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        {/* <div className="favorites__image-wrapper place-card__image-wrapper"> */}
        {/* <div className="near-places__image-wrapper place-card__image-wrapper"> */}
        <a href="">
          <img
            className="place-card__image"
            src={previewImage}
            width="260"
            height="200"
            alt="Place image"
          />
        </a>
      </div>
      <div className="place-card__info">
        {/* <div className="favorites__card-info place-card__info"> */}
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button button ${isFavorite ? 'place-card__bookmark-button--active' : ''}`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">
              {isFavorite ? 'In bookmarks' : 'To bookmarks'}
            </span>
          </button>
        </div>
        <RatingStars rating={rating} isPreview />
        <h2 className="place-card__name">
          <a href={`/offer/${id}`}>{title}</a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default Card;
