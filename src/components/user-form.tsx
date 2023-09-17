import { FC, FormEvent, useCallback, useEffect, useMemo } from 'react';
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import AppForm from './layout/app-form/app-form';
import { selectUser } from '../services/reducers/user';
import { useForm } from '../hooks/use-form';
import { IUser } from '../models/user';
import { useRootSelector } from '../hooks/use-root-selector';
import { useAppDispatch } from '../hooks/use-app-dispatch';
import { UPDATE_USER } from '../services/actions/user';

const UserForm: FC = () => {
  const { user, isLoading } = useRootSelector(selectUser);

  const dispatch = useAppDispatch();

  const [state, onChange, patch] = useForm({ ...(user as IUser), password: '' });

  const stateEqual = useMemo(() => {
    if (state.password) {
      return false;
    }

    if (state.name !== user?.name) {
      return false;
    }

    if (state.email !== user?.email) {
      return false;
    }

    return true;
  }, [state, user]);

  useEffect(() => {
    if (isLoading) {
      patch(user as IUser);
    }
  }, [isLoading]);

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const data = state.password ? state : { name: state.name, email: state.email };
      dispatch(UPDATE_USER(data)).catch(() => {
        patch({ ...(user as IUser), password: '' });
      });
    },
    [state, dispatch, user, patch]
  );

  const onReset = () => {
    patch({ ...user, password: '' });
  };

  return (
    <AppForm onSubmit={onSubmit} orderActions="right">
      {{
        default: (
          <>
            <Input name="name" placeholder="Имя" value={state.name} onChange={onChange} />
            <EmailInput name="email" placeholder="E-mail" value={state.email} onChange={onChange} />
            <PasswordInput
              name="password"
              placeholder="Пароль"
              value={state.password}
              onChange={onChange}
            />
          </>
        ),
        actions: (
          <>
            <Button htmlType="reset" type="secondary" disabled={stateEqual} onClick={onReset}>
              Отмена
            </Button>
            <Button htmlType="submit" disabled={stateEqual}>
              Сохранить
            </Button>
          </>
        ),
      }}
    </AppForm>
  );
};

export default UserForm;
