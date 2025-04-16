import { store } from './index.js';
import { CitiesEnum, CardType } from '../const/type';
import { SortType } from '../components/sort/type';
import { AuthorizationStatus } from '../const/enum';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AuthData = {
  login: string;
  password: string;
};

export type UserData = {
  id: number;
  email: string;
  token: string;
};

export interface AppState {
  city: CitiesEnum;
  offers: CardType[];
  sort: SortType;
  isLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
  error: string | null;
}
