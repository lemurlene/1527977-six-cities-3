import { render, screen } from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import FooterMemo from './footer';

describe('Component: Footer', () => {
  it('should render correct', () => {
    const footerId = 'footer';

    render(<FooterMemo />, {wrapper: BrowserRouter});
    const footer = screen.getByTestId(footerId);

    expect(footer).toBeInTheDocument();
  });
});
