import { FC, FormEvent, useCallback } from 'react';
import {
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import AppMain from '../../components/layout/app-main/app-main';
import { useForm } from '../../hooks/use-form';
import AppCenterContainer from '../../components/layout/app-center-container/app-center-container';
import AppForm from '../../components/layout/app-form/app-form';
import AppFromDesc from '../../components/layout/app-form/app-from-desc';
import AppFromLink from '../../components/layout/app-form/app-from-link';
import { login } from '../../api/auth';
import { IS_USER_CHECKED, SET } from '../../services/reducers/user';
import { AppDispatch } from '../../store';
import {
  routeForgotPassword,
  routeHome,
  routeRegister,
} from '../../components/app-router/app-router';

const LoginPage: FC = () => {
  const [state, onChange] = useForm({ email: '', password: '' });
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const navigate = useNavigate();
  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      login(state).then((user) => {
        dispatch(SET({ user }));
        dispatch(IS_USER_CHECKED());
        const { from } = location.state || { from: { pathname: routeHome } };
        navigate(from);
      });
    },
    [state]
  );
  return (
    <AppMain>
      <AppCenterContainer>
        <AppForm title="Вход" onSubmit={onSubmit}>
          {{
            default: (
              <>
                <EmailInput
                  placeholder="e-mail"
                  value={state.email}
                  onChange={onChange}
                  name="email"
                />
                <PasswordInput
                  placeholder="Пароль"
                  value={state.password}
                  onChange={onChange}
                  name="password"
                />
              </>
            ),
            actions: <Button htmlType="submit">Вход</Button>,
            links: (
              <>
                <AppFromDesc>
                  Вы — новый пользователь?{' '}
                  <AppFromLink to={routeRegister}>Зарегистрироваться</AppFromLink>
                </AppFromDesc>
                <AppFromDesc>
                  Забыли пароль?{' '}
                  <AppFromLink to={routeForgotPassword}>Восстановить пароль</AppFromLink>
                </AppFromDesc>
              </>
            ),
          }}
        </AppForm>
      </AppCenterContainer>
    </AppMain>
  );
};

export default LoginPage;
