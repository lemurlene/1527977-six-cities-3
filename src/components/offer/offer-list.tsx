import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Nullable } from 'vitest';
import { getState } from './utils';
import { AppRoute } from '../../const/enum';
import Card from './card';
import { CardType } from '../../const/type';

type GetCardsProps = {
  cardsCount: number;
  offers: CardType[];
}

function OfferList({ offers, cardsCount }: GetCardsProps): JSX.Element {
  const [activeCard, setActiveCard] = useState<Nullable<CardType>>(null);
  const handleHover = (card?: CardType) => {
    setActiveCard(card || null);
  };
  useEffect(() => {
    // console.log(activeCard);
  }, [activeCard]);
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

