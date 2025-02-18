type HousingTypes = 'apartment' | 'room' | 'house' | 'hotel';
import { Cities } from './const';
type CitiesEnum = typeof Cities[keyof typeof Cities];

export type CardType = {
  id: string;
  title: string;
  type: HousingTypes;
  price: number;
  previewImage: string;
  city: {
    name: CitiesEnum;
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
  };
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
};

export type OfferType = {
  id: string;
  title: string;
  description: string;
  type: HousingTypes;
  price: number;
  images: string[];
  city: {
    name: CitiesEnum;
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
  };
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
