import HeaderLogo from './logo';
import HeaderNav from './nav';
const isPageLogin = false;

function Header(): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <HeaderLogo />
          {!isPageLogin && <HeaderNav />}
        </div >
      </div >
    </header >
  );
}

export default Header;
