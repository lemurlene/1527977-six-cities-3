import { useMemo } from 'react';
import { useAppSelector } from '../../hooks';
import { selectFavoriteOffers } from '../../store/favorites/favorites.selector';
import { CardType } from '../../const/type';

function useGroupedOffers() {
  const offers = useAppSelector(selectFavoriteOffers);

  return useMemo(() => (
    offers.reduce<Record<string, CardType[]>>((acc, offer) => {
      const cityName = offer.city.name;
      acc[cityName] = [...(acc[cityName] || []), offer];
      return acc;
    }, {})
  ), [offers]);
}

export default useGroupedOffers;
