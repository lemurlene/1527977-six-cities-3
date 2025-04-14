import { CitiesEnum } from '../../const/type';

type MainEmptyProps = {
  currentCity: CitiesEnum;
}

function MainEmpty({ currentCity }: MainEmptyProps): JSX.Element {
  return (
    <section className="cities__no-places">
      <div className="cities__status-wrapper tabs__content">
        <b className="cities__status">No places to stay available</b>
        <p className="cities__status-description">
          We could not find any property available at the moment in {currentCity}
        </p>
      </div>
    </section>
  );
}

export default MainEmpty;
