import { FC, FormEvent, useCallback } from 'react';
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation, useNavigate } from 'react-router';
import AppMain from '../../components/layout/app-main/app-main';
import { useForm } from '../../hooks/use-form';
import AppCenterContainer from '../../components/layout/app-center-container/app-center-container';
import AppForm from '../../components/layout/app-form/app-form';
import AppFromDesc from '../../components/layout/app-form/app-from-desc';
import AppFromLink from '../../components/layout/app-form/app-from-link';
import { register } from '../../api/auth';
import { IS_USER_CHECKED, SET } from '../../services/reducers/user';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { routeHome, routeLogin } from '../../components/app-router/app-router';

const RegisterPage: FC = () => {
  const [state, onChange] = useForm({ name: '', email: '', password: '' });
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      register(state).then((user) => {
        dispatch(SET({ user }));
        dispatch(IS_USER_CHECKED());
        const { from } = location.state || { from: { pathname: routeHome } };
        navigate(from);
      });
    },
    [state, dispatch]
  );
  return (
    <AppMain>
      <AppCenterContainer>
        <AppForm title="Регистрация" onSubmit={onSubmit}>
          {{
            default: (
              <>
                <Input placeholder="Имя" value={state.name} onChange={onChange} name="name" />
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
            actions: (
              <Button htmlType="submit" disabled={!state.name || !state.email || !state.password}>
                Зарегистрироваться
              </Button>
            ),
            links: (
              <AppFromDesc>
                Уже зарегистрированы? <AppFromLink to={routeLogin}>Войти</AppFromLink>
              </AppFromDesc>
            ),
          }}
        </AppForm>
      </AppCenterContainer>
    </AppMain>
  );
};

export default RegisterPage;
