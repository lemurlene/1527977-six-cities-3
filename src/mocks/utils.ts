import { Cities } from '../const/const';

export const getRandomCity = (): typeof Cities[keyof typeof Cities] => {
  const cityValues = Object.values(Cities);
  const randomIndex = Math.floor(Math.random() * cityValues.length);
  return cityValues[randomIndex];
};

const RatingCount = {
  MIN: 1,
  MAX: 5
};

export const generateRating = (): number =>
  Math.round((Math.random() * (RatingCount.MAX - RatingCount.MIN) + RatingCount.MIN));


