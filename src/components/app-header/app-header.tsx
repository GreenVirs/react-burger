import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';
import NavigationLink from '../navigation-link/navigation-link';

import headerStyles from './app-header.module.scss';
import containerStyles from '../app-container/app-container.module.scss';

const AppHeader: FC = () => (
  <header className={`${headerStyles.header} ${containerStyles.container} pt-4 pb-4`}>
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
    <span className={headerStyles.header__logo}>
      <NavigationLink icon={ProfileIcon} href="#">
        Личный кабинет
      </NavigationLink>
    </span>
  </header>
);

export default AppHeader;
