import { Hourglass } from 'react-loader-spinner';
function Spinner() {
  return (
    <p>
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

export default Spinner;
