import { Outlet } from 'react-router';
import AppMain from '../../components/layout/app-main/app-main';
import NavigationLink from '../../components/navigation-link/navigation-link';
import styles from './profile.module.scss';
import { routeLogout, routeMyOrders, routeProfile } from '../../components/app-router/app-router';

const ProfilePage = () => (
  <AppMain>
    <div className={styles.profile}>
      <nav className={styles.profile__nav}>
        <NavigationLink large to={routeProfile}>
          Профиль
        </NavigationLink>
        <NavigationLink large to={`${routeProfile}/${routeMyOrders}`}>
          История заказов
        </NavigationLink>
        <NavigationLink large to={routeLogout}>
          Выход
        </NavigationLink>
        <p className="pt-20 text text_type_main-default text_color_inactive">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>
      <Outlet />
    </div>
  </AppMain>
);

export default ProfilePage;
