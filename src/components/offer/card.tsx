import { Link, useLocation } from 'react-router-dom';
import { memo, useCallback, useMemo } from 'react';
import cn from 'classnames';
import { getState } from './utils';
import { AppRoute } from '../../const/enum';
import { CardType } from '../../const/type';
import RatingStars from '../rating-stars';
import { DefaultCardSize } from './const';

type CardProps = {
  card: CardType;
  handleHover: (id: string | null) => void;
  size?: {
    width: number;
    height: number;
  };
}

function Card({ card, handleHover, size = DefaultCardSize }: CardProps): JSX.Element {
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

  const handleMouseEnter = useCallback(() => {
    handleHover(id);
  }, [handleHover, id]);

  const handleMouseLeave = useCallback(() => {
    handleHover(null);
  }, [handleHover]);

  const cardClasses = useMemo(() => ({
    article: `${placeClassPrefix}__card place-card`,
    imageWrapper: `${placeClassPrefix}__image-wrapper place-card__image-wrapper`,
    info: `place-card__info ${addInfoClass}`,
    button: cn(
      'place-card__bookmark-button button',
      { 'place-card__bookmark-button--active': isFavorite }
    )
  }), [placeClassPrefix, addInfoClass, isFavorite]);

  return (
    <Link to={`/offer/${id}`} className={cardClasses.article}>
      <article
        className={cardClasses.article}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {isPremium && (
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
        )}
        <div className={cardClasses.imageWrapper}>
          <img
            className="place-card__image"
            src={previewImage}
            width={size.width}
            height={size.height}
            alt="Place image"
            loading="lazy"
          />
        </div>
        <div className={cardClasses.info}>
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;{price}</b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>
            <button
              className={cardClasses.button}
              type="button"
              aria-label={isFavorite ? 'In bookmarks' : 'To bookmarks'}
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

const CardMemo = memo(Card);

export default CardMemo;
