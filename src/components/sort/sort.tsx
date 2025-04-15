import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { useAppSelector } from '../../hooks/store';
import { selectSort } from '../../store/selectors/offers';
import SortOption from './sort-option';
import { SortTypes } from './const';

function Sort(): JSX.Element {
  const sortRef = useRef<HTMLElement>(null);
  const [isSortingOpen, setSortingOpen] = useState(false);
  const currentSortType = useAppSelector(selectSort);

  useEffect(() => {
    const handleClickSort = (evt: MouseEvent) => {
      if (evt.target instanceof HTMLElement && sortRef.current && !sortRef.current.contains(evt.target)) {
        setSortingOpen(false);
      }
    };
    document.addEventListener('click', handleClickSort);

    return () => {
      document.removeEventListener('click', handleClickSort);
    };
  }, []);

  const sortOption = Object.values(SortTypes).map((option) => (
    <SortOption
      key={option}
      isCurrent={currentSortType === option}
      sortType={option}
    />));

  const handleSortTypeChange = () => {
    setSortingOpen((lastOpened) => !lastOpened);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        ref={sortRef}
        onClick={handleSortTypeChange}
      >
        {currentSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={cn('places__options places__options--custom',
          {'places__options--opened': isSortingOpen})}
      >
        {sortOption}
      </ul>
    </form>
  );
}

export default Sort;
