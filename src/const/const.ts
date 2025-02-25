export const Setting = {
  DefaultCity: 'Paris',
  DefaultSort: 'Popular',
  CardsCount: 5,
  RatingsCoefficient: 20,
  OffersPhotoCount: 6,
  NearPlacesCardsCount: 3,
} as const;

export const Cities = {
  Paris: 'Paris',
  Cologne: 'Cologne',
  Brussels: 'Brussels',
  Amsterdam: 'Amsterdam',
  Hamburg: 'Hamburg',
  Dusseldorf: 'Dusseldorf'
} as const;

export const SortTypes = {
  Popular: 'Popular',
  Low: 'Price: low to high',
  High: 'Price: high to low',
  Top: 'Top rated first'
} as const;

export const FormLoginFields = [
  {
    type: 'email',
    name: 'email',
    placeholder: 'Email',
  },
  {
    type: 'password',
    name: 'password',
    placeholder: 'Password',
  },
];

export const FormReviewFields = [
  {
    value: 5,
    title: 'perfect'
  },
  {
    value: 4,
    title: 'good'
  },
  {
    value: 3,
    title: 'not bad'
  },
  {
    value: 2,
    title: 'badly'
  },
  {
    value: 1,
    title: 'terribly'
  }
];
