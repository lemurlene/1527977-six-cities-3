import { render, screen } from '@testing-library/react';
import SpinnerMemo from '.';

describe('Component: Spinner', () => {
  it('should render coorect', () => {
    render(<SpinnerMemo />);

    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
