import cn from 'classnames';
import { OfferType, ReviewType, CardType } from '../../const/type';
import BookmarkMemo from '../bookmark';
import RatingStars from '../rating-stars';
import Reviews from '../reviews';
import Map from '../map';
import { Setting } from '../../const/const';
import { AuthorizationEnum } from '../../const/type';

type GetOfferProps = {
  offer: OfferType;
  comments: ReviewType[];
  offersNear: CardType[];
  authorizationStatus: AuthorizationEnum;
}

function Offer({ offer, comments, offersNear, authorizationStatus }: GetOfferProps): JSX.Element {
  const {
    id,
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

  const safeOffersNear = offersNear || [];
  const maxNearOffers = Math.min(Setting.NearPlacesCount, safeOffersNear.length);
  const offersMap = [offer, ...safeOffersNear.slice(0, maxNearOffers)];

  return (
    <section className="offer">
      <div className="offer__gallery-container container">
        <div className="offer__gallery">
          {images.slice(0, Setting.OffersPhotoCount).map((image) => (
            <div className="offer__image-wrapper" key={image} >
              <img className="offer__image" src={image} alt="Photo studio" />
            </div>)
          )}
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
            <BookmarkMemo isOffer offerId={id} isFavorite={isFavorite}/>
          </div>
          <RatingStars rating={rating} classPrefix='offer' isOffer />
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
              <div className={cn('offer__avatar-wrapper user__avatar-wrapper', { 'offer__avatar-wrapper--pro': isPro })}>
                <img className="offer__avatar user__avatar" src={avatarUrl} width="74" height="74" alt="Host avatar" />
              </div>
              <span className="offer__user-name">{name}</span>
              {isPro && <span className="offer__user-status">Pro</span>}
            </div>
            <div className="offer__description">
              <p className="offer__text">{description}</p>
            </div>
          </div>
          <Reviews comments={comments} authorizationStatus={authorizationStatus} />
        </div>
      </div>
      <Map city={offer.city.location} offers={offersMap} selectedOfferId={id} />
    </section>
  );
}

export default Offer;
