import { Cities } from '../../const/const';

const cityValues = Object.values(Cities);

const getRandomCity = (): typeof Cities[keyof typeof Cities] => {
  const randomIndex = Math.floor(Math.random() * cityValues.length);
  return cityValues[randomIndex];
};

export { getRandomCity };
