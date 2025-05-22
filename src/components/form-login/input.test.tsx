import { render, screen } from '@testing-library/react';
import Input from './input';

describe('Input component', () => {
  it('should render correctly with basic props', () => {
    render(
      <Input
        type="text"
        name="username"
        placeholder="Enter username"
      />
    );

    const input = screen.getByPlaceholderText('Enter username');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('name', 'username');
    expect(input).toBeRequired();
  });

  it('should accept additional attributes', () => {
    render(
      <Input
        type="password"
        name="password"
        placeholder="Enter password"
        pattern=".{6,}"
        title="Minimum 6 characters"
      />
    );

    const input = screen.getByPlaceholderText('Enter password');
    expect(input).toHaveAttribute('pattern', '.{6,}');
    expect(input).toHaveAttribute('title', 'Minimum 6 characters');
  });
});
