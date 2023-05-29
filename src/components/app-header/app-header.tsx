import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';
import { clsx } from 'clsx';
import NavigationLink from '../navigation-link/navigation-link';

import headerStyles from './app-header.module.scss';
import containerStyles from '../layout/app-container/app-container.module.scss';
import { routeFeed, routeHome, routeProfile } from '../app-router/app-router';

const headerClasses = clsx(headerStyles.header, containerStyles.container);

const AppHeader: FC = () => (
  <header className={headerClasses}>
    <nav className={headerStyles.header__nav}>
      <NavigationLink icon={BurgerIcon} to={routeHome}>
        Конструктор
      </NavigationLink>
      <NavigationLink icon={ListIcon} to={routeFeed}>
        Лента заказов
      </NavigationLink>
    </nav>
    <span className={headerStyles.header__logo}>
      <Logo />
    </span>
    <span className={headerStyles.header__actions}>
      <NavigationLink icon={ProfileIcon} to={routeProfile}>
        Личный кабинет
      </NavigationLink>
    </span>
  </header>
);

export default AppHeader;
