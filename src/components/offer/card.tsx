import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { getState } from './utils';
import { AppRoute } from '../../const/enum';
import { CardType } from '../../const/type';
import RatingStars from '../rating-stars';

type CardProps = {
  card: CardType;
  handleHover: (id: string | null) => void;
  size?: {
    width: number;
    height: number;
  };
}

function Card({ card, handleHover, size = { width: 260, height: 200 } }: CardProps): JSX.Element {
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
  const { pathname } = useLocation();
  const { placeClassPrefix, addInfoClass } = getState(pathname as AppRoute);
  return (
    <Link to={`/offer/${id}`} className={`${placeClassPrefix}__card place-card`}>
      <article
        className={`${placeClassPrefix}__card place-card`}
        onMouseEnter={() => handleHover(id)}
        onMouseLeave={() => handleHover(null)}
      >
        {isPremium && (
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
        )}
        <div className={`${placeClassPrefix}__image-wrapper place-card__image-wrapper`}>
          <img
            className="place-card__image"
            src={previewImage}
            width={size.width}
            height={size.height}
            alt="Place image"
          />
        </div>
        <div className={`place-card__info ${addInfoClass}`}>
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;{price}</b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>
            <button
              className={cn(
                'place-card__bookmark-button button',
                { 'place-card__bookmark-button--active': isFavorite }
              )}
              type="button"
            >
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">
                {isFavorite && 'In bookmarks'}
                {!isFavorite && 'To bookmarks'}
              </span>
            </button>
          </div>
          <RatingStars rating={rating} classPrefix='place-card' />
          <h2 className="place-card__name">{title}</h2>
          <p className="place-card__type">{type}</p>
        </div>
      </article>
    </Link>
  );
}

export default Card;
