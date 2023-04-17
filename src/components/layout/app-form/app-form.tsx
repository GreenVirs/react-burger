import { FC, FormEvent, ReactNode } from 'react';
import styles from './app-form.module.scss';

interface AppFormProps {
  title?: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  children: {
    default?: ReactNode;
    actions?: ReactNode;
    links?: ReactNode;
  };
}

const AppForm: FC<AppFormProps> = ({ children, title, onSubmit }) => (
  <form onSubmit={onSubmit} className={styles.form}>
    {title && <h1 className={styles.form__title}>{title}</h1>}
    {children.default && <div className={styles.form__inputs}>{children.default}</div>}
    {children.actions && <div className={styles.form__actions}>{children.actions}</div>}
    {children.links && <div className={styles.form__links}>{children.links}</div>}
  </form>
);

AppForm.defaultProps = {
  title: '',
};

export default AppForm;
