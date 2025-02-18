import { OfferType, ReviewType } from '../../type';
import RatingStars from '../ratingStars';
import Reviews from '../review/reviews';
import Map from '../map';

type GetOfferProps = {
  offer: OfferType;
  comments: ReviewType[];
}

function Offer({ offer, comments }: GetOfferProps): JSX.Element {
  const {
    title,
    description,
    type,
    price,
    images,
    goods,
    host: {
      name,
      avatarUrl,
      isPro
    },
    isPremium,
    isFavorite,
    rating,
    bedrooms,
    maxAdults
  } = offer;

  return (
    <section className="offer">
      <div className="offer__gallery-container container">
        <div className="offer__gallery">
          <div className="offer__image-wrapper">
            {images.map((image) => (
              <img className="offer__image" key={image} src={image} alt="Photo studio" />)
            )}
          </div>
        </div>
      </div>
      <div className="offer__container container">
        <div className="offer__wrapper">
          {isPremium && (
            <div className="offer__mark">
              <span>Premium</span>
            </div>
          )}
          <div className="offer__name-wrapper">
            <h1 className="offer__name">{title}</h1>
            <button className={`offer__bookmark-button button ${isFavorite ? 'offer__bookmark-button--active' : ''}`} type="button">
              <svg className="offer__bookmark-icon" width="31" height="33">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              {isFavorite ? 'In bookmarks' : 'To bookmarks'}
            </button>
          </div>
          <RatingStars rating={rating} isPreview />
          <ul className="offer__features">
            <li className="offer__feature offer__feature--entire">
              {type}
            </li>
            <li className="offer__feature offer__feature--bedrooms">
              {bedrooms} Bedrooms
            </li>
            <li className="offer__feature offer__feature--adults">
              Max {maxAdults} adults
            </li>
          </ul>
          <div className="offer__price">
            <b className="offer__price-value">&euro;{price}</b>
            <span className="offer__price-text">&nbsp;night</span>
          </div>
          <div className="offer__inside">
            <h2 className="offer__inside-title">What&apos;s inside</h2>
            <ul className="offer__inside-list">
              {goods.map((good) => (
                <li className="offer__inside-item" key={good}>{good}</li>)
              )}
            </ul>
          </div>
          <div className="offer__host">
            <h2 className="offer__host-title">Meet the host</h2>
            <div className="offer__host-user user">
              <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                <img className="offer__avatar user__avatar" src={avatarUrl} width="74" height="74" alt="Host avatar" />
              </div>
              <span className="offer__user-name">{name}</span>
              <span className="offer__user-status">{isPro}</span>
            </div>
            <div className="offer__description">
              <p className="offer__text">{description}</p>
            </div>
          </div>
          <Reviews comments={comments} />
        </div>
      </div>
      <Map />
    </section>
  );
}

export default Offer;
