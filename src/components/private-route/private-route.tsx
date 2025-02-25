import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const/enum';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  isReverse?: boolean;
  children: JSX.Element;
}

function PrivateRoute({ authorizationStatus, isReverse, children }: PrivateRouteProps) {
  return (
    authorizationStatus === (isReverse ? AuthorizationStatus.NoAuth : AuthorizationStatus.Auth) ?
      children :
      <Navigate to={isReverse ? AppRoute.Root : AppRoute.Login} />
  );
}

export default PrivateRoute;
