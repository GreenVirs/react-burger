import { FC } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { clsx } from 'clsx';
import styles from './app-form.module.scss';

const AppFromLink: FC<LinkProps> = ({ children, className, ...props }) => (
  <Link className={clsx(className, styles.form__link)} {...props}>
    {children}
  </Link>
);
export default AppFromLink;
