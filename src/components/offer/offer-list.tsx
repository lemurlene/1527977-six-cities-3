import { useLocation } from 'react-router-dom';
import { memo } from 'react';
import { useAppSelector } from '../../hooks';
import { selectSortListType } from '../../store/sort/sort.selector';
import { getState } from './utils';
import { AppRoute } from '../../const/enum';
import CardMemo from './card';
import { CardType } from '../../const/type';
import { sortOffers } from '../sort/utils';


type GetCardsProps = {
  cardsCount?: number;
  offers: CardType[];
  handleHover?: (id: string | null) => void;
}

function OfferList({ offers, cardsCount = offers.length, handleHover }: GetCardsProps): JSX.Element {
  const { pathname } = useLocation();
  const { offerListClass } = getState(pathname as AppRoute);
  const currentSort = useAppSelector(selectSortListType);
  const sortedOffers = sortOffers(offers, currentSort);
  const cardsOnPage = sortedOffers.slice(0, Math.min(cardsCount, sortedOffers.length));

  return (
    <div className={`${offerListClass} places__list`}>
      {cardsOnPage.map((card) => (
        <CardMemo
          key={card.id}
          card={card}
          handleHover={handleHover}
        />))}
    </div>
  );
}

const OfferListMemo = memo(OfferList);

export default OfferListMemo;
