
import { useAppSelector } from '../../hooks';
import { selectError } from '../../store/selectors/api';
import './error-message.css';

function ErrorMessage(): JSX.Element | null {
  const error = useAppSelector(selectError);

  return (error)
    ? <div className='error-message'>{error}</div>
    : null;

}

export default ErrorMessage;
