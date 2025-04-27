import { AuthData, UserData, CommentType, FavoriteData } from './type';
import { CardType, OfferType, FullOfferType, ReviewType } from '../const/type';
import { APIRoute } from '../const/enum';
import { NameSpace } from './const';
import { createAppAsyncThunk } from '../hooks';

const fetchOffers = createAppAsyncThunk<CardType[], undefined>(
  `${NameSpace.Offers}/fetchOffers`,
  async (_arg, { extra: api }) => {
    const { data } = await api.get<CardType[]>(APIRoute.Offers);
    return data;
  }
);

const checkAuthorization = createAppAsyncThunk<UserData, undefined>(
  `${NameSpace.User}/checkAuthorization`,
  async (_arg, { extra: api}) => {
    const {data} = await api.get<UserData>(APIRoute.Login);
    return data;
  },
);

const loginAction = createAppAsyncThunk<UserData, AuthData>(
  `${NameSpace.User}/login`,
  async ({ login: email, password }, { extra: api }) => {
    const {data} = await api.post<UserData>(APIRoute.Login, { email, password });
    return data;
  }
);

const logoutAction = createAppAsyncThunk<void, undefined>(
  `${NameSpace.User}/logout`,
  async (_arg, {extra: api }) => {
    await api.delete(APIRoute.Logout);
  }
);

const getOfferInfoById = createAppAsyncThunk<OfferType, string>(
  `${NameSpace.Offer}/getOfferInfo`,
  async (id, { extra: api }) => {
    const { data } = await api.get<OfferType>(`${APIRoute.Offers}/${id}`);
    return data;
  }
);

const fetchOffersNear = createAppAsyncThunk<CardType[], string>(
  `${NameSpace.Offers}/fetchNearbyOffers`,
  async (id, { extra: api }) => {
    const { data } = await api.get<CardType[]>(`${APIRoute.Offers}/${id}/nearby`);
    return data;
  }
);

const fetchOfferComments = createAppAsyncThunk<ReviewType[], string>(
  `${NameSpace.Reviews}/fetchOfferComments`,
  async (id, { extra: api }) => {
    const { data } = await api.get<ReviewType[]>(`${APIRoute.Comments}/${id}`);
    return data;
  }
);

const postOfferComment = createAppAsyncThunk<ReviewType, CommentType>(
  `${NameSpace.Reviews}/postOfferComment`,
  async ({ id, comment }, { extra: api }) => {
    const { data } = await api.post<ReviewType>(`${APIRoute.Comments}/${id}`,{ comment: comment.review, rating: +comment.rating });
    return data;
  }
);

const fetchFavoriteOffers = createAppAsyncThunk<CardType[], undefined>(
  `${NameSpace.Favorite}/fetchFavoritesOffers`,
  async (_arg, { extra: api }) => {
    const { data } = await api.get<CardType[]>(APIRoute.Favorite);
    return data;
  }
);

const changeFavoriteStatus = createAppAsyncThunk<FullOfferType, FavoriteData>(
  `${NameSpace.Favorite}/changeFavoriteStatus`,
  async ({offerId, isFavorite}, { extra: api}) => {
    const offerStatus = Number(!isFavorite);
    const {data} = await api.post<FullOfferType>(`${APIRoute.Favorite}/${offerId}/${offerStatus}`);
    return data;
  });

export { fetchOffers, checkAuthorization, loginAction, logoutAction,
  getOfferInfoById, fetchOffersNear, fetchOfferComments, postOfferComment, fetchFavoriteOffers, changeFavoriteStatus };
