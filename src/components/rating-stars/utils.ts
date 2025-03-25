import { Setting } from '../../const/const';

export const getRatingStars = (rating: number) =>
  Math.round(rating) * Setting.RatingsCoefficient;
