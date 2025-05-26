import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ButtonSubmit from './button-submit';
import { ReviewSize } from './const';

describe('ButtonSubmit component', () => {
  it('should render correctly when enabled', () => {
    render(<ButtonSubmit isDisabled={false} />);

    expect(screen.getByRole('button')).not.toBeDisabled();
    expect(screen.getByText(/Submit/)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${ReviewSize.MinCharacters} characters`)))
      .toBeInTheDocument();
  });

  it('should render correctly when disabled', () => {
    render(<ButtonSubmit isDisabled />);

    expect(screen.getByRole('button')).toBeDisabled();
  });
});
