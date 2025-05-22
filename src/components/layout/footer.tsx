import {Link} from 'react-router-dom';
import { memo } from 'react';

function Footer(): JSX.Element {
  return (
    <footer className="footer container" data-testid="footer">
      <Link className="footer__logo-link" to="/">
        <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
      </Link>
    </footer>
  );
}

const FooterMemo = memo(Footer);

export default FooterMemo;
