import { FC, FormEvent, useCallback, useEffect, useMemo } from 'react';
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import AppForm from './layout/app-form/app-form';
import { AppDispatch, RootState } from '../store';
import { SET, UserState } from '../services/reducers/user';
import { useForm } from '../hooks/use-form';
import { IUser } from '../models/user';
import { updateUser } from '../api/auth';

const UserForm: FC = () => {
  const {
    user: { user, isLoading },
  } = useSelector<RootState, { user: UserState }>((state) => ({
    user: state.user,
  }));
  const dispatch = useDispatch<AppDispatch>();
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
      updateUser(data).then(({ success }) => {
        if (success) {
          dispatch(SET({ user: { name: state.name, email: state.email } }));
        } else {
          patch({ ...(user as IUser), password: '' });
        }
      });
    },
    [state, dispatch, user, patch]
  );
  return (
    <AppForm onSubmit={onSubmit}>
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
          <Button htmlType="submit" disabled={stateEqual}>
            Сохранить
          </Button>
        ),
      }}
    </AppForm>
  );
};

export default UserForm;
