import { AuthorizationStatus } from '../../const/enum';
import { useAppSelector } from '../../hooks';
import { selectOffersLoading } from '../../store/offers/offers.selector';
import { selectFavoriteOffersLoading } from '../../store/favorites/favorites.selector';
import { selectAuthorization, selectLoadingLogout } from '../../store/user/user.selector';

function IsAppLoading(): boolean {
  const authorizationStatus = useAppSelector(selectAuthorization);
  const isOffersLoading = useAppSelector(selectOffersLoading);
  const isFavoriteOffersLoading = useAppSelector(selectFavoriteOffersLoading);
  const isLoadingLogout = useAppSelector(selectLoadingLogout);
  return (
    isOffersLoading ||
    isFavoriteOffersLoading ||
    isLoadingLogout ||
    authorizationStatus === AuthorizationStatus.Unknown
  );
}

export default IsAppLoading;
