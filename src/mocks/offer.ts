import { OfferType } from '../const/type';

export const offer = {
  'id': 'a1b9061f-79a9-4afe-9ce5-5099eaba930e',
  'title': 'Penthouse, 4-5 rooms + 5 balconies',
  'description': 'Relax, rejuvenate and unplug in this ultimate rustic getaway experience in the country. In our beautiful screened Pondhouse, you can gaze at the stars and listen to the sounds of nature from your cozy warm bed.',
  'type': 'apartment',
  'price': 144,
  'images': [
    'https://15.design.htmlacademy.pro/static/hotel/8.jpg',
    'https://15.design.htmlacademy.pro/static/hotel/10.jpg',
    'https://15.design.htmlacademy.pro/static/hotel/11.jpg',
    'https://15.design.htmlacademy.pro/static/hotel/20.jpg',
    'https://15.design.htmlacademy.pro/static/hotel/19.jpg',
    'https://15.design.htmlacademy.pro/static/hotel/11.jpg',
    'https://15.design.htmlacademy.pro/static/hotel/20.jpg',
    'https://15.design.htmlacademy.pro/static/hotel/19.jpg',
    'https://15.design.htmlacademy.pro/static/hotel/6.jpg'
  ],
  'city': {
    'name': 'Paris',
    'location': {
      'latitude': 48.85661,
      'longitude': 2.351499,
      'zoom': 13
    }
  },
  'location': {
    'latitude': 48.868610000000004,
    'longitude': 2.342499,
    'zoom': 16
  },
  'goods': [
    'Towels',
    'Laptop friendly workspace',
    'Coffee machine',
    'Wi-Fi',
    'Heating',
    'Washing machine',
    'Air conditioning',
    'Cable TV',
    'Baby seat',
    'Washer'
  ],
  'host': {
    'isPro': true,
    'name': 'Angelina',
    'avatarUrl': 'https://15.design.htmlacademy.pro/static/host/avatar-angelina.jpg'
  },
  'isPremium': false,
  'isFavorite': false,
  'rating': 5,
  'bedrooms': 2,
  'maxAdults': 4
} satisfies OfferType;
