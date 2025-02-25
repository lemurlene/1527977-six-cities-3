
import { useLocation } from 'react-router-dom';
import { AppRoute } from '../../const/enum';
import { getState } from './utils';

function Map(): JSX.Element {
  const { pathname } = useLocation();
  const { rootClassPrefix } = getState(pathname as AppRoute);
  return (
    <section className={`map ${rootClassPrefix}__map`}></section>
  );
}

export default Map;
