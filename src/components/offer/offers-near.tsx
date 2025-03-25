import { OfferList } from '../../components/offer';
import { CardType } from '../../const/type';

type GetPlacesProps = {
  NearPlacesCardsCount: number;
  offersNear: CardType[];
  handleHover: (id: string | null) => void;
}

function OffersNear({ offersNear, NearPlacesCardsCount, handleHover }: GetPlacesProps): JSX.Element {
  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <OfferList offers={offersNear} cardsCount={NearPlacesCardsCount} handleHover={handleHover} />
    </section>
  );
}

export default OffersNear;
