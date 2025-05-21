const RatingCount = {
  MIN: 1,
  MAX: 5
};

export const generateRating = (): number =>
  Math.round((Math.random() * (RatingCount.MAX - RatingCount.MIN) + RatingCount.MIN));
