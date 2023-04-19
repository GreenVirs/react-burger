import { FC, PropsWithChildren } from 'react';
import styles from './app-form.module.scss';

const AppFromDesc: FC<PropsWithChildren> = ({ children }) => (
  <p className={styles.form__decs}>{children}</p>
);

export default AppFromDesc;
