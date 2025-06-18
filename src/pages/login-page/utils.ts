import { useAppSelector } from '../../hooks';
import { selectCurrentCity } from '../../store/city/city.selector';
import { Cities } from '../../const/const';

const GetRandomCity = (): typeof Cities[keyof typeof Cities] => {
  const currentCity = useAppSelector(selectCurrentCity);
  const cityValues = Object.values(Cities).filter((city) => city !== currentCity);
  const randomIndex = Math.floor(Math.random() * cityValues.length);

  return cityValues[randomIndex];
};

export { GetRandomCity };
