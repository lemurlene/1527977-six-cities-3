export const Setting = {
  DefaultCity: 'Paris',
  CardsCount: 5,
  RatingsCoefficient: 20,
  OffersPhotoCount: 6,
  NearPlacesCount: 3,
} as const;

export const Cities = {
  Paris: 'Paris',
  Cologne: 'Cologne',
  Brussels: 'Brussels',
  Amsterdam: 'Amsterdam',
  Hamburg: 'Hamburg',
  Dusseldorf: 'Dusseldorf'
} as const;

export const CityLocation = {
  Paris: {
    latitude: 48.85661,
    longitude: 2.351499,
    zoom: 13
  },
  Cologne: {
    latitude: 50.938361,
    longitude: 6.959974,
    zoom: 13
  },
  Dusseldorf: {
    latitude: 51.225402,
    longitude: 6.776314,
    zoom: 13
  },
  Brussels: {
    latitude: 50.846557,
    longitude: 4.351697,
    zoom: 13
  },
  Amsterdam: {
    latitude: 52.35514938496378,
    longitude: 4.673877537499948,
    zoom: 8
  },
  Hamburg: {
    latitude: 53.550341,
    longitude: 10.000654,
    zoom: 13
  },
} as const;
