import { FC } from 'react';
import AppMain from '../components/layout/app-main/app-main';
import AppCenterContainer from '../components/layout/app-center-container/app-center-container';

const ErrorPage: FC = () => (
  <AppMain>
    <AppCenterContainer>Страница не найдена</AppCenterContainer>
  </AppMain>
);

export default ErrorPage;
