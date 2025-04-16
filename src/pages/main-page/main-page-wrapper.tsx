import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { changeCity } from '../../store/action';
import { Cities } from '../../const/const';
import { CitiesEnum } from '../../const/type';
import MainPage from './main-page';

type MainPageWrapperProps = {
  cardsCount: number;
}

const isValidCity = (city: string): city is CitiesEnum =>
  Object.values(Cities).includes(city as CitiesEnum);

function MainPageWrapper({ cardsCount }: MainPageWrapperProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const cityFromUrl = searchParams.get('city');

    if (cityFromUrl && isValidCity(cityFromUrl)) {
      dispatch(changeCity(cityFromUrl));
    } else if (!cityFromUrl) {
      const defaultCity: CitiesEnum = 'Paris';
      dispatch(changeCity(defaultCity));
      setSearchParams({ city: defaultCity });
    }
  }, [searchParams, dispatch, setSearchParams]);

  return <MainPage cardsCount={cardsCount} />;
}

export default MainPageWrapper;
