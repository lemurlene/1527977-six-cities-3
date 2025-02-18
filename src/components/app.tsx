import MainPage from '../pages/main-page.tsx';
import { CardType } from '../type.tsx';

type AppCardsProps = {
  offers: CardType[];
  cardsCount: number;
}

function App({offers, cardsCount}: AppCardsProps): JSX.Element {
  return (
    <MainPage offers={offers} cardsCount={cardsCount} />
  );
}

export default App;
