import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HeaderLogoMemo from './header-logo';
import { AppRoute } from '../../const/enum';

describe('HeaderLogo component', () => {
  const headerLogoId = 'header-logo';
  const activeClass = 'header__logo-link--active';

  it('should render correctly active link on main page', () => {
    render(
      <MemoryRouter initialEntries={[AppRoute.Root]}>
        <HeaderLogoMemo />
      </MemoryRouter>
    );

    const logoLink = screen.getByTestId(headerLogoId).querySelector('a');

    expect(logoLink).toHaveClass(activeClass);
    expect(logoLink).toHaveAttribute('href', '/');
    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
  });

  it('should render correctly not active link on other pages', () => {
    render(
      <MemoryRouter initialEntries={[AppRoute.Favorites]}>
        <HeaderLogoMemo />
      </MemoryRouter>
    );

    const logoLink = screen.getByTestId(headerLogoId).querySelector('a');

    expect(logoLink).not.toHaveClass(activeClass);
    expect(logoLink).toHaveAttribute('href', '/');
  });
});
