import { FC, FormEvent, useCallback } from 'react';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation, useNavigate } from 'react-router';
import AppMain from '../../components/layout/app-main/app-main';
import { useForm } from '../../hooks/use-form';
import AppCenterContainer from '../../components/layout/app-center-container/app-center-container';
import AppForm from '../../components/layout/app-form/app-form';
import AppFromDesc from '../../components/layout/app-form/app-from-desc';
import AppFromLink from '../../components/layout/app-form/app-from-link';
import { routeLogin, routeResetPassword } from '../../components/app-router/app-router';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { FORGOT_PASSWORD } from '../../services/actions/user';

const ForgotPasswordPage: FC = () => {
  const dispatch = useAppDispatch();
  const [state, onChange] = useForm({ email: '' });
  const location = useLocation();
  const navigate = useNavigate();
  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(FORGOT_PASSWORD(state)).then(() => {
        navigate(routeResetPassword, { state: { ...location.state, resetPass: true } });
      });
    },
    [state, navigate, location]
  );
  return (
    <AppMain>
      <AppCenterContainer>
        <AppForm title="Восстановление пароля" onSubmit={onSubmit}>
          {{
            default: (
              <EmailInput
                placeholder="e-mail"
                value={state.email}
                onChange={onChange}
                name="email"
              />
            ),
            actions: <Button htmlType="submit">Восстановить</Button>,
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

export default ForgotPasswordPage;
