import { useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectOffer, selectOfferLoading, selectErrorConnection } from '../../store/offer/offer.selector';
import { selectOffersNear, selectOffersNearLoading } from '../../store/offers-near/offers-near.selector';
import { selectCommentsOffersStatus, selectOffersComments } from '../../store/reviews/reviews.selector';
import { Offer, OffersNear } from '../../components/offer';
import { AuthorizationEnum } from '../../const/type';
import { getOfferInfoById, fetchOffersNear, fetchOfferComments } from '../../store/api-action';
import { setErrorConnectionStatusOffer } from '../../store/offer/offer.slice';
import LoadingPage from '../loading-page/loading-page';
import NotFoundPage from '../not-found-page/not-found-page';
import ErrorServer from '../../components/error-server';
import { useId } from '../../utils';

type OfferPageProps = {
  authorizationStatus: AuthorizationEnum;
}

function OfferPage({ authorizationStatus }: OfferPageProps): JSX.Element {
  const dispatch = useAppDispatch();
  const offerId = useId();

  const [offer, isOfferLoading, errorConnectionStatus] = useAppSelector((state) => [
    selectOffer(state),
    selectOfferLoading(state),
    selectErrorConnection(state)
  ]);

  const [offersNear, isOffersNearLoading] = useAppSelector((state) => [
    selectOffersNear(state),
    selectOffersNearLoading(state)
  ]);

  const [comments, isOffersCommentsLoading] = useAppSelector((state) => [
    selectOffersComments(state),
    selectCommentsOffersStatus(state)
  ]);

  const loadOfferData = useCallback(async () => {
    if (!offerId) {
      return;
    }

    try {
      await dispatch(getOfferInfoById(offerId)).unwrap();
      await Promise.all([
        dispatch(fetchOffersNear(offerId)),
        dispatch(fetchOfferComments(offerId))
      ]);
    } catch {
      dispatch(setErrorConnectionStatusOffer(true));
    }
  }, [dispatch, offerId]);

  useEffect(() => {
    loadOfferData();
    return () => {
      dispatch(setErrorConnectionStatusOffer(false));
    };
  }, [loadOfferData, dispatch]);

  if (errorConnectionStatus && offer) {
    return <ErrorServer />;
  }

  if (isOfferLoading || isOffersNearLoading || isOffersCommentsLoading) {
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
          <OffersNear offersNear={offersNear} />
        </div>
      </main>
    </>
  );
}

export default OfferPage;
