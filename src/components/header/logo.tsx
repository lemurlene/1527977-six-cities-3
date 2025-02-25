const isMain = true;

function HeaderLogo(): JSX.Element {
  return (
    <div className="header__left">
      <a className={`header__logo-link ${isMain ? 'header__logo-link--active' : ''}`} href={isMain ? undefined : 'main.html'}>
        <img className='header__logo' src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
      </a>
    </div >
  );
}

export default HeaderLogo;
