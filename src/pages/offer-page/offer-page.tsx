import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Nullable } from 'vitest';
import { Offer, OffersNear } from '../../components/offer';
import { OfferType, ReviewType, CardType } from '../../const/type';

type GetOfferProps = {
  offer: OfferType;
  comments: ReviewType[];
  offersNear: CardType[];
  NearPlacesCardsCount: number;
}

function OfferPage({ offer, comments, offersNear, NearPlacesCardsCount }: GetOfferProps): JSX.Element {
  const [activeCardId, setActiveCardId] = useState<Nullable<string>>(null);
  const handleHover = (id: string | null) => {
    setActiveCardId(id || null);
  };

  useEffect(() => {
    // console.log(activeCardId);
  }, [activeCardId]);
  return (
    <>
      <Helmet>
        <title>6 cities: offer</title>
      </Helmet>
      <main className="page__main page__main--offer">
        <Offer offer={offer} comments={comments} offersNear={offersNear} />
        <div className="container">
          <OffersNear offersNear={offersNear} NearPlacesCardsCount={NearPlacesCardsCount} handleHover={handleHover} />
        </div>
      </main>
    </>
  );
}

export default OfferPage;
