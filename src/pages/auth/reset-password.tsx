import { FC, FormEvent, useCallback } from 'react';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Navigate, useLocation, useNavigate } from 'react-router';
import AppMain from '../../components/layout/app-main/app-main';
import { useForm } from '../../hooks/use-form';
import AppCenterContainer from '../../components/layout/app-center-container/app-center-container';
import AppForm from '../../components/layout/app-form/app-form';
import AppFromDesc from '../../components/layout/app-form/app-from-desc';
import AppFromLink from '../../components/layout/app-form/app-from-link';
import { resetPassport } from '../../api/auth';
import { routeLogin } from '../../components/app-router/app-router';

const ResetPasswordPage: FC = () => {
  const [state, dispatch] = useForm({ password: '', token: '' });
  const location = useLocation();
  const navigate = useNavigate();
  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      resetPassport(state).then(({ success }) => {
        if (success) {
          navigate(routeLogin, { state: { ...location.state } });
        }
      });
    },
    [state, navigate, location]
  );

  if (!location.state?.resetPass) {
    return <Navigate to={routeLogin} />;
  }

  return (
    <AppMain>
      <AppCenterContainer>
        <AppForm title="Регистрация" onSubmit={onSubmit}>
          {{
            default: (
              <>
                <PasswordInput
                  placeholder="Введите новый пароль"
                  value={state.password}
                  onChange={dispatch}
                  name="password"
                />
                <Input
                  placeholder="Введите код из письма"
                  value={state.token}
                  onChange={dispatch}
                  name="token"
                />
              </>
            ),
            actions: (
              <Button htmlType="submit" disabled={!state.password || !state.token}>
                Сохранить
              </Button>
            ),
            links: (
              <AppFromDesc>
                Вспомнили пароль? <AppFromLink to={routeLogin}>Войти</AppFromLink>
              </AppFromDesc>
            ),
          }}
        </AppForm>
      </AppCenterContainer>
    </AppMain>
  );
};

export default ResetPasswordPage;
