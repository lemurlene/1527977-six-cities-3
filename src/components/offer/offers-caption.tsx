import { memo } from 'react';

type OffersCaptionProps = {
  offersCount: number;
  cityName: string;
};

function OffersCaption({ offersCount, cityName }: OffersCaptionProps) {
  const getPlacesWord = (num: number) => num === 1 ? 'place' : 'places';

  return (
    <b className="places__found">
      {offersCount} {getPlacesWord(offersCount)} to stay in {cityName}
    </b>
  );
}

const OffersCaptionMemo = memo(OffersCaption);

export default OffersCaptionMemo;
