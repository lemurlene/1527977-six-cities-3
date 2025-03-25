export const Setting = {
  DefaultSort: 'Popular',
  CardsCount: 5,
  RatingsCoefficient: 20,
  OffersPhotoCount: 6,
  NearPlacesCardsCount: 3,
  MinReviewCharacters: 50,
} as const;

export const Cities = {
  Paris: 'Paris',
  Cologne: 'Cologne',
  Brussels: 'Brussels',
  Amsterdam: 'Amsterdam',
  Hamburg: 'Hamburg',
  Dusseldorf: 'Dusseldorf'
} as const;

export const DefaultCity = {
  name: 'Paris',
  location: {
    latitude: 48.85661,
    longitude: 2.351499,
    zoom: 13,
  },
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
    ratingValue: 5,
    title: 'perfect'
  },
  {
    ratingValue: 4,
    title: 'good'
  },
  {
    ratingValue: 3,
    title: 'not bad'
  },
  {
    ratingValue: 2,
    title: 'badly'
  },
  {
    ratingValue: 1,
    title: 'terribly'
  }
];
