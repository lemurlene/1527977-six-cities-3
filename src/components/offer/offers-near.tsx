import { OfferListMemo } from '../../components/offer';
import { CardType } from '../../const/type';

type GetPlacesProps = {
  NearPlacesCount: number;
  offersNear: CardType[];
  handleHover: (id: string | null) => void;
}

function OffersNear({ offersNear, NearPlacesCount, handleHover }: GetPlacesProps): JSX.Element {
  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <OfferListMemo offers={offersNear} cardsCount={NearPlacesCount} handleHover={handleHover} />
    </section>
  );
}

export default OffersNear;
