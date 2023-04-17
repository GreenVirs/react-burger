import { FC, FormEvent, ReactNode, useMemo } from 'react';
import { clsx } from 'clsx';
import styles from './app-form.module.scss';

interface AppFormProps {
  title?: string;
  orderActions?: 'left' | 'center' | 'right';
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  children: {
    default?: ReactNode;
    actions?: ReactNode;
    links?: ReactNode;
  };
}

const AppForm: FC<AppFormProps> = ({ children, title, onSubmit, orderActions }) => {
  const actionsClasses = useMemo(
    () => clsx(styles.form__actions, styles[`form__actions--${orderActions}`]),
    [orderActions]
  );
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      {title && <h1 className={styles.form__title}>{title}</h1>}
      {children.default && <div className={styles.form__inputs}>{children.default}</div>}
      {children.actions && <div className={actionsClasses}>{children.actions}</div>}
      {children.links && <div className={styles.form__links}>{children.links}</div>}
    </form>
  );
};

AppForm.defaultProps = {
  title: '',
  orderActions: 'center',
};

export default AppForm;
