import { Outlet } from 'react-router';
import AppMain from '../../components/layout/app-main/app-main';
import AppCenterContainer from '../../components/layout/app-center-container/app-center-container';
import NavigationLink from '../../components/navigation-link/navigation-link';
import styles from './profile.module.scss';

const ProfilePage = () => (
  <AppMain>
    <AppCenterContainer>
      <div className={styles.profile}>
        <nav className={styles.profile__nav}>
          <NavigationLink large to="/profile">
            Профиль
          </NavigationLink>
          <NavigationLink large to="/orders-history">
            История заказов
          </NavigationLink>
          <NavigationLink large to="/logout">
            Выход
          </NavigationLink>
          <p className="pt-20 text text_type_main-default text_color_inactive">
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </nav>
        <Outlet />
      </div>
    </AppCenterContainer>
  </AppMain>
);

export default ProfilePage;
