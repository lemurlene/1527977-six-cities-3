import { Setting } from '../../const/const';

export const getRatingStars = (rating: number) => {
  const normalizedRating = Math.min(Math.max(0, rating), Setting.RatingStars);
  return Math.round(normalizedRating) * Setting.RatingsCoefficient;
};
