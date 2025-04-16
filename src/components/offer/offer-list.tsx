import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { selectSort } from '../../store/selectors/offers';
import { getState } from './utils';
import { AppRoute } from '../../const/enum';
import Card from './card';
import { CardType } from '../../const/type';
import { sortOffers } from '../sort/utils';


type GetCardsProps = {
  cardsCount: number;
  offers: CardType[];
  handleHover: (id: string | null) => void;
}

function OfferList({ offers, cardsCount, handleHover }: GetCardsProps): JSX.Element {
  const { pathname } = useLocation();
  const { offerListClass } = getState(pathname as AppRoute);
  const currentSort = useAppSelector(selectSort);
  const sortedOffers = sortOffers(offers, currentSort);

  return (
    <div className={`${offerListClass} places__list`}>
      {sortedOffers.slice(0, cardsCount).map((card) => (
        <Card
          key={card.id}
          card={card}
          handleHover={handleHover}
        />))}
    </div>
  );
}

export default OfferList;


