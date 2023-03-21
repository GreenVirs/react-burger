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
import containerStyles from '../app-container/app-container.module.scss';

const headerClasses = clsx(headerStyles.header, containerStyles.container);

const AppHeader: FC = () => (
  <header className={headerClasses}>
    <nav className={headerStyles.header__nav}>
      <NavigationLink icon={BurgerIcon} href="#" active>
        Конструктор
      </NavigationLink>
      <NavigationLink icon={ListIcon} href="#">
        Лента заказов
      </NavigationLink>
    </nav>
    <span className={headerStyles.header__logo}>
      <Logo />
    </span>
    <span className={headerStyles.header__actions}>
      <NavigationLink icon={ProfileIcon} href="#">
        Личный кабинет
      </NavigationLink>
    </span>
  </header>
);

export default AppHeader;
