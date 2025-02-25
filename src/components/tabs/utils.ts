type NavLinkProps = {
  isActive: boolean;
}

export const getClassForNavLink = ({isActive}: NavLinkProps) =>
  isActive ? 'tabs__item--active locations__item-link tabs__item' : 'locations__item-link tabs__item';
