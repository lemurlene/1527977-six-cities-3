import { Navigate } from 'react-router-dom';
import { memo, useMemo } from 'react';
import { AppRoute, AuthorizationStatus } from '../../const/enum';
import { AuthorizationEnum } from '../../const/type';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationEnum;
  isReverse?: boolean;
  children: JSX.Element;
}

const PrivateRoute = ({ authorizationStatus, isReverse = false, children }: PrivateRouteProps) => {
  const shouldRenderChildren = useMemo(
    () => authorizationStatus === (isReverse ? AuthorizationStatus.NoAuth : AuthorizationStatus.Auth),
    [authorizationStatus, isReverse]
  );

  const redirectTo = useMemo(
    () => isReverse ? AppRoute.Root : AppRoute.Login,
    [isReverse]
  );

  return shouldRenderChildren ? children : <Navigate to={redirectTo} />;
};

const PrivateRouteMemo = memo(PrivateRoute);

export default PrivateRouteMemo;
