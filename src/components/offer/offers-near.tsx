import Card from './card';
import { CardType } from '../../const/type';

type GetPlacesProps = {
  NearPlacesCardsCount: number;
  offersNear: CardType[];
}

function OffersNear({ offersNear, NearPlacesCardsCount }: GetPlacesProps): JSX.Element {
  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        {offersNear.slice(0, NearPlacesCardsCount).map((card) => (<Card key={card.id} {...card} />))}
      </div>
    </section>
  );
}

export default OffersNear;
