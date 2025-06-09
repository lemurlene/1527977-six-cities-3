import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import TextareaRating from './textarea-rating';
import { PLACEHOLDER } from './const';

describe('TextareaRating component', () => {
  const mockOnChange = vi.fn();

  it('should render correctly', () => {
    render(
      <TextareaRating
        review=""
        onChange={mockOnChange}
        isDisabled={false}
      />
    );

    expect(screen.getByPlaceholderText(PLACEHOLDER)).toBeInTheDocument();
  });

  it('should call onChange when typing', async () => {
    render(
      <TextareaRating
        review=""
        onChange={mockOnChange}
        isDisabled={false}
      />
    );

    const textarea = screen.getByRole('textbox');
    await userEvent.type(textarea, 'test');
    expect(mockOnChange).toHaveBeenCalledTimes(4);
  });

  it('should be disabled when isDisabled is true', () => {
    render(
      <TextareaRating
        review=""
        onChange={mockOnChange}
        isDisabled
      />
    );

    expect(screen.getByRole('textbox')).toBeDisabled();
  });
});
