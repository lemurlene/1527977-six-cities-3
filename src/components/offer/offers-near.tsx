import { OfferListMemo } from '../../components/offer';
import { CardType } from '../../const/type';
import { Setting } from '../../const/const';

type GetPlacesProps = {
  offersNear: CardType[];
}

function OffersNear({ offersNear }: GetPlacesProps): JSX.Element {
  const NearPlacesCount = Setting.NearPlacesCount;
  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <OfferListMemo offers={offersNear} cardsCount={NearPlacesCount} />
    </section>
  );
}

export default OffersNear;
