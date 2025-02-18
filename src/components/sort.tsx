import { SortTypes, Setting } from '../const';
const defaultSort = Setting.DefaultSort;

function Sort(): JSX.Element {
  const sortOptions = Object.values(SortTypes).map((option) => (
    <li key={option} className={`places__option ${option === defaultSort ? 'places__option--active' : ''}`} tabIndex={0}>
      {option}
    </li>
  ));

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        {defaultSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className="places__options places__options--custom places__options--opened">
        {sortOptions}
      </ul>
    </form>
  );
}

export default Sort;
