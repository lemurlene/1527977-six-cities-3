import { memo } from 'react';
import { useAppSelector } from '../../hooks';
import { selectUserInfo } from '../../store/user/user.selector';
import { selectFavoriteOffersCount } from '../../store/favorites/favorites.selector';

function UserInfo(): JSX.Element {
  const userInfo = useAppSelector(selectUserInfo);
  let email = '';
  if (userInfo) {
    email = userInfo.email;
  }

  const favoritesCount = useAppSelector(selectFavoriteOffersCount);

  return (
    <>
      <span className="header__user-name user__name">{email}</span>
      <span className="header__favorite-count">{favoritesCount}</span>
    </>
  );
}

const UserInfoMemo = memo(UserInfo);

export default UserInfoMemo;
