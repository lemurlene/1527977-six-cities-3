import { Helmet } from 'react-helmet-async';
import { Offer, OffersNear } from '../../components/offer';
import { OfferType, ReviewType, CardType } from '../../const/type';

type GetOfferProps = {
  offer: OfferType;
  comments: ReviewType[];
  offersNear: CardType[];
  NearPlacesCardsCount: number;
}

function OfferPage({ offer, comments, offersNear, NearPlacesCardsCount }: GetOfferProps): JSX.Element {
  return (
    <>
      <Helmet>
        <title>6 cities: offer</title>
      </Helmet>
      <main className="page__main page__main--offer">
        <Offer offer={offer} comments={comments} />
        <div className="container">
          <OffersNear offersNear={offersNear} NearPlacesCardsCount={NearPlacesCardsCount} />
        </div>
      </main>
    </>
  );
}

export default OfferPage;
