import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { withStore } from '../../../mocks/mock-component';
import FormReview from './form-review';
import { FormReviewFields, ReviewSize, PLACEHOLDER } from './const';


vi.mock('../../../utils', () => ({
  useId: vi.fn(() => 'test-offer-id')
}));

describe('FormReview component', () => {
  const initialState = {
    REVIEWS: {
      offerComments: [],
      isLoadingComments: false,
      isLoadingComment: false,
    },
    ERROR: {
      error: null
    },
  };

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(
      <MemoryRouter>
        <FormReview />
      </MemoryRouter>,
      initialState
    );

    render(withStoreComponent);

    expect(screen.getByText('Your review')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(PLACEHOLDER)).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(FormReviewFields.length);
  });

  it('should update review text when typing', async () => {
    const { withStoreComponent } = withStore(
      <MemoryRouter>
        <FormReview />
      </MemoryRouter>,
      initialState
    );

    render(withStoreComponent);
    const textarea = screen.getByRole('textbox');
    const testText = 'This is a test review';

    await userEvent.type(textarea, testText);
    expect(textarea).toHaveValue(testText);
  });

  it('should select rating when clicking on stars', async () => {
    const { withStoreComponent } = withStore(
      <MemoryRouter>
        <FormReview />
      </MemoryRouter>,
      initialState
    );

    render(withStoreComponent);
    const firstStar = screen.getAllByRole('radio')[0];

    await userEvent.click(firstStar);
    expect(firstStar).toBeChecked();
  });

  it('should disable submit button when form is invalid', () => {
    const { withStoreComponent } = withStore(
      <MemoryRouter>
        <FormReview />
      </MemoryRouter>,
      initialState
    );

    render(withStoreComponent);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should enable submit button when form is valid', async () => {
    const { withStoreComponent } = withStore(
      <MemoryRouter>
        <FormReview />
      </MemoryRouter>,
      initialState
    );

    render(withStoreComponent);

    await userEvent.click(screen.getAllByRole('radio')[0]);

    const longText = 'A'.repeat(ReviewSize.MinCharacters);
    await userEvent.type(screen.getByRole('textbox'), longText);

    expect(screen.getByRole('button')).not.toBeDisabled();
  });

  it('should show validation message', () => {
    const { withStoreComponent } = withStore(
      <MemoryRouter>
        <FormReview />
      </MemoryRouter>,
      initialState
    );

    render(withStoreComponent);

    expect(screen.getByText(new RegExp(`${ReviewSize.MinCharacters} characters`)))
      .toBeInTheDocument();
  });

  it('should disable form when comment is sending', () => {
    const { withStoreComponent } = withStore(
      <MemoryRouter>
        <FormReview />
      </MemoryRouter>,
      {
        REVIEWS: {
          offerComments: [],
          isLoadingComments: false,
          isLoadingComment: true,
        },
        ERROR: {
          error: null
        },
      }
    );

    render(withStoreComponent);

    expect(screen.getByRole('textbox')).toBeDisabled();
    expect(screen.getAllByRole('radio')[0]).toBeDisabled();
    expect(screen.getByRole('button')).toBeDisabled();
  });
});


