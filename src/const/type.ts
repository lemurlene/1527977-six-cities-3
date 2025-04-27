import { Cities } from './const';
import { AuthorizationStatus } from './enum';

type HousingTypes = 'apartment' | 'room' | 'house' | 'hotel';

export type CitiesEnum = typeof Cities[keyof typeof Cities];

type CityType = {
  name: CitiesEnum;
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
};

export type FullOfferType = {
  id: string;
  title: string;
  description: string;
  type: HousingTypes;
  price: number;
  previewImage: string;
  images: string[];
  city: CityType;
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  goods: string[];
  host: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  bedrooms: number;
  maxAdults: number;
};

type OnlyOfferType = {
  description: string;
  images: string[];
  goods: string[];
  host: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  bedrooms: number;
  maxAdults: number;
}

export type CardType = Omit<FullOfferType, keyof OnlyOfferType>;

export type OfferType = Omit<FullOfferType, 'previewImage'>;

export type ReviewType = {
  id: string;
  date: string;
  user: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  comment: string;
  rating: number;
};

export type AuthorizationEnum = typeof AuthorizationStatus[keyof typeof AuthorizationStatus];
