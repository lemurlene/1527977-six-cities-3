import { Cities } from '../../const/const';

const GetRandomCity = (currentCity: typeof Cities[keyof typeof Cities]): typeof Cities[keyof typeof Cities] => {
  const cityValues = Object.values(Cities).filter((city) => city !== currentCity);
  const randomIndex = Math.floor(Math.random() * cityValues.length);

  return cityValues[randomIndex];
};

export { GetRandomCity };
