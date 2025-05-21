import { render, screen } from '@testing-library/react';
import ErrorMessage from '.';
import { withStore } from '../../mocks/mock-component';

describe('Component: ErrorMessage', () => {
  it('should render correctly with error', () => {
    const mockError = 'Test error message';
    const { withStoreComponent } = withStore(<ErrorMessage />, {
      ERROR: {
        error: mockError
      }
    });

    render(withStoreComponent);

    expect(screen.getByTestId('error-message')).toBeInTheDocument();
  });

  it('should not render when there is no error', () => {
    const { withStoreComponent } = withStore(<ErrorMessage />, {
      ERROR: {
        error: null
      }
    });

    render(withStoreComponent);

    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
  });
});
