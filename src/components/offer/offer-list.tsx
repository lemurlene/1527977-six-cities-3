import { useLocation } from 'react-router-dom';
import { getState } from './utils';
import { AppRoute } from '../../const/enum';
import Card from './card';
import { CardType } from '../../const/type';

type GetCardsProps = {
  cardsCount: number;
  offers: CardType[];
  handleHover: (id: string | null) => void;
}

function OfferList({ offers, cardsCount, handleHover }: GetCardsProps): JSX.Element {
  const { pathname } = useLocation();
  const { offerListClass } = getState(pathname as AppRoute);
  return (
    <div className={`${offerListClass} places__list`}>
      {offers.slice(0, cardsCount).map((card) => (
        <Card
          key={card.id}
          card={card}
          handleHover={handleHover}
        />))}
    </div>
  );
}

export default OfferList;


