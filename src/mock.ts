import { CardType, FullOfferType } from './const/type';

export const makeFakeCard = (isFavorite = false): CardType => ({
  id: isFavorite ? 'faa632dd-82a8-4fe2-a397-91bdfe78a874' : '59e85f10-22f3-469d-8a64-f9480aa4bbad',
  title: 'Beautiful & luxurious studio at great location',
  type: 'apartment',
  price: 120,
  city: {
    name: 'Amsterdam',
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8
    }
  },
  location: {
    latitude: 52.35514938496378,
    longitude: 4.673877537499948,
    zoom: 8
  },
  isFavorite: isFavorite,
  isPremium: false,
  rating: 4,
  description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
  previewImage: 'https://url-to-image/image.png',
} as CardType);

export const makeFakeOffer = (isFavorite = false): FullOfferType => ({
  id: isFavorite ? 'faa632dd-82a8-4fe2-a397-91bdfe78a874' : '59e85f10-22f3-469d-8a64-f9480aa4bbad',
  title: 'Beautiful & luxurious studio at great location',
  type: 'apartment',
  price: 120,
  city: {
    name: 'Amsterdam',
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8
    }
  },
  location: {
    latitude: 52.35514938496378,
    longitude: 4.673877537499948,
    zoom: 8
  },
  isFavorite: isFavorite,
  isPremium: false,
  rating: 4,
  description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
  bedrooms: 3,
  goods: [
    'Heating'
  ],
  host: {
    name: 'Oliver Conner',
    avatarUrl: 'https://url-to-image/image.png',
    isPro: false
  },
  images: [
    'https://url-to-image/image.png'
  ],
  maxAdults: 4
} as FullOfferType);

