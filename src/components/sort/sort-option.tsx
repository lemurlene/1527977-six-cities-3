import { useAppDispatch } from '../../hooks/store';
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
      className={`places__option ${isCurrent && 'places__option--active'}`}
      tabIndex={0}
      onClick={() => dispatch(changeSort(sortType))}
    >
      {sortType}
    </li>
  );
}

export default SortOption;
