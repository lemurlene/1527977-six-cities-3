import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Nullable } from 'vitest';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectOffer, selectOfferLoading, selectOffersNear,
  selectOffersNearLoading, selectOffersCommentsLoading,
  selectOffersComments } from '../../store/selectors/offer';
import { selectErrorConnection } from '../../store/selectors/api';
import { Offer, OffersNear } from '../../components/offer';
import { AuthorizationEnum } from '../../const/type';
import { getOfferInfoById, fetchOffersNear, fetchOfferComments } from '../../store/api-action';
import { setErrorConnection } from '../../store/action';
import LoadingPage from '../loading-page/loading-page';
import NotFoundPage from '../not-found-page/not-found-page';
import ErrorMessage from '../../components/error-message';
import { useId } from '../../utils';

type GetOfferProps = {
  NearPlacesCardsCount: number;
  authorizationStatus: AuthorizationEnum;
}

function OfferPage({ NearPlacesCardsCount, authorizationStatus }: GetOfferProps): JSX.Element {
  const dispatch = useAppDispatch();
  const offerId = useId();
  const isOfferLoading = useAppSelector(selectOfferLoading);
  const offer = useAppSelector(selectOffer);
  const isNearbyOffersLoading = useAppSelector(selectOffersNearLoading);
  const offersNear = useAppSelector(selectOffersNear);
  const isOffersCommentsLoading = useAppSelector(selectOffersCommentsLoading);
  const comments = useAppSelector(selectOffersComments);
  const errorConnectionStatus = useAppSelector(selectErrorConnection);

  const [, setActiveCardId] = useState<Nullable<string>>(null);
  const handleHover = (id: string | null) => {
    setActiveCardId(id || null);
  };

  useEffect(() => {
    if (!offerId) {
      return;
    }
    dispatch(getOfferInfoById(offerId))
      .unwrap()
      .then(() => {
        dispatch(fetchOffersNear(offerId));
        dispatch(fetchOfferComments(offerId));
      })
      .catch(() => {
        dispatch(setErrorConnection(true));
      });
  }, [dispatch, offerId]);

  if (errorConnectionStatus) {
    return <ErrorMessage />;
  }

  if (isOfferLoading || isNearbyOffersLoading || isOffersCommentsLoading) {
    return <LoadingPage />;
  }

  if (!offer) {
    return <NotFoundPage />;
  }

  return (
    <>
      <Helmet>
        <title>6 cities: offer</title>
      </Helmet>
      <main className="page__main page__main--offer">
        <Offer offer={offer} comments={comments} offersNear={offersNear} authorizationStatus={authorizationStatus} />
        <div className="container">
          <OffersNear offersNear={offersNear} NearPlacesCardsCount={NearPlacesCardsCount} handleHover={handleHover} />
        </div>
      </main>
    </>
  );
}

export default OfferPage;
