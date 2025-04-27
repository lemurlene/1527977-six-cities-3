import { memo, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AuthorizationStatus, LoadingStatus, APIRoute } from '../../const/enum';
import { selectAuthorization } from '../../store/user/user.selector';
import { selectUploadingFavoriteStatus } from '../../store/favorites/favorites.selector';
import { changeFavoriteStatus } from '../../store/api-action';

import { BookmarkConfig } from './const';

type BookmarkProps = {
  isOffer?: boolean;
  offerId: string;
  isFavorite: boolean;
}

function Bookmark({ isOffer = false, offerId, isFavorite }: BookmarkProps): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(selectAuthorization);
  const loadingFavoriteOffersStatus = useAppSelector(selectUploadingFavoriteStatus) === LoadingStatus.Loading;
  const isAuthenticated = useMemo(() => authorizationStatus === AuthorizationStatus.Auth, [authorizationStatus]);

  const { classPrefix, iconSize } = useMemo(() => (
    isOffer ? BookmarkConfig.Offer : BookmarkConfig.Card
  ), [isOffer]);

  const handleBookmarkClick = useMemo(() => () => {
    if (isAuthenticated) {
      dispatch(changeFavoriteStatus({ offerId, isFavorite }));
    } else {
      navigate(APIRoute.Login);
    }
  }, [dispatch, isAuthenticated, navigate, offerId, isFavorite]);

  const buttonClasses = cn(
    'button',
    `${classPrefix}__bookmark-button`,
    {
      [`${classPrefix}__bookmark-button--active`]: isFavorite && isAuthenticated
    }
  );

  const iconClass = `${classPrefix}__bookmark-icon`;

  return (
    <button
      className={buttonClasses}
      type = "button"
      onClick = { handleBookmarkClick }
      disabled = { loadingFavoriteOffersStatus }
    >
      <svg
        className={iconClass}
        width={iconSize.width}
        height={iconSize.height}
      >
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">
        {isFavorite && isAuthenticated ? 'In bookmarks' : 'To bookmarks'}
      </span>
    </button >
  );
}

const BookmarkMemo = memo(Bookmark);

export default BookmarkMemo;
