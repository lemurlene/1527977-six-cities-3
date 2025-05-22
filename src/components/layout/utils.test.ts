import { getLayoutState } from './utils';
import { AppRoute } from '../../const/enum';

describe('getLayoutState function', () => {
  it('should return correct state for Root path', () => {
    const result = getLayoutState(AppRoute.Root);
    expect(result).toEqual({
      rootClassName: ' page--gray page--main',
      linkClassName: 'header__logo-link--active',
      shouldRenderUser: true,
      shouldRenderFooter: false
    });
  });

  it('should return correct state for Login path', () => {
    const result = getLayoutState(AppRoute.Login);
    expect(result).toEqual({
      rootClassName: ' page--gray page--login',
      linkClassName: '',
      shouldRenderUser: false,
      shouldRenderFooter: false
    });
  });

  it('should return correct state for Favorites path', () => {
    const result = getLayoutState(AppRoute.Favorites);
    expect(result).toEqual({
      rootClassName: '',
      linkClassName: '',
      shouldRenderUser: true,
      shouldRenderFooter: true
    });
  });

  it('should return correct state for Offer path', () => {
    const offerPath = '/offer/:123';
    const result = getLayoutState(offerPath as AppRoute);
    expect(result).toEqual({
      rootClassName: '',
      linkClassName: '',
      shouldRenderUser: true,
      shouldRenderFooter: false
    });
  });

  it('should return default state for unknown path', () => {
    const result = getLayoutState('/unknown' as AppRoute);
    expect(result).toEqual({
      rootClassName: ' page--gray page--main',
      linkClassName: '',
      shouldRenderUser: true,
      shouldRenderFooter: true
    });
  });
});
