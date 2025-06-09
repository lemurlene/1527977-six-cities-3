import { memo } from 'react';
import { Hourglass } from 'react-loader-spinner';

function Spinner() {
  return (
    <p data-testid="spinner-wrapper">
      <Hourglass
        visible
        height="80"
        width="80"
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={['#306cce', '#72a1ed']}
      />
    </p>
  );
}

const SpinnerMemo = memo(Spinner);

export default SpinnerMemo;
