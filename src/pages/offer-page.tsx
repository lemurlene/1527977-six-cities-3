import Header from '../components/header/header';
import Offer from '../components/offer/offer';
import OffersNear from '../components/offer/offers-near';
import { OfferType, ReviewType, CardType } from '../type';

type GetOfferProps = {
  offer: OfferType;
  comments: ReviewType[];
  offersNear: CardType[];
  NearPlacesCardsCount: number;
}

function OfferPage({ offer, comments, offersNear, NearPlacesCardsCount }: GetOfferProps): JSX.Element {
  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--offer">
        <Offer offer={offer} comments={comments} />
        <div className="container">
          <OffersNear offersNear={offersNear} NearPlacesCardsCount={NearPlacesCardsCount} />
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
