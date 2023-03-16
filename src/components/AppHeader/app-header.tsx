import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import NavigationLink from "../NavigationLink/navigation-link";
import { FC } from 'react';

import headerStyles from './app-header.module.css';
import containerStyles from '../AppContainer/app-container.module.css';
const AppHeader: FC = () => {
    return (
        <header className={`${headerStyles.header} ${containerStyles.container} pt-4 pb-4`}>
            <nav className={headerStyles.header__nav}>
                <NavigationLink icon={BurgerIcon} href='#' active>
                    Конструктор
                </NavigationLink>
                <NavigationLink icon={ListIcon} href='#'>
                    Лента заказов
                </NavigationLink>
            </nav>
            <span className={headerStyles.header__logo}>
                <Logo />
            </span>
            <span className={headerStyles.header__logo}>
                <NavigationLink icon={ProfileIcon} href='#'>
                    Личный кабинет
                </NavigationLink>
            </span>
        </header>)
}

export default AppHeader;