import { render, screen } from '@testing-library/react';
import SpinnerMemo from '.';

describe('Component: Spinner', () => {
  it('should render coorect', () => {
    const spinnerWrapperId = 'spinner-wrapper';
    render(<SpinnerMemo />);

    expect(screen.getByTestId(spinnerWrapperId)).toBeInTheDocument();
  });
});
