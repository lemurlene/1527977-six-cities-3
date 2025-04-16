import cn from 'classnames';
import { useAppDispatch } from '../../hooks';
import { changeSort } from '../../store/action';
import { SortType } from './type';

type SortOptionProps = {
  isCurrent: boolean;
  sortType: SortType;
}

function SortOption({ isCurrent, sortType }: SortOptionProps): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <li
      className={cn('places__option',
        {'places__option--active': isCurrent})}
      tabIndex={0}
      onClick={() => dispatch(changeSort(sortType))}
    >
      {sortType}
    </li>
  );
}

export default SortOption;
