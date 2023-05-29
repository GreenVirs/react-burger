import { FC, HTMLAttributes } from 'react';
import { clsx } from 'clsx';
import styles from './app-avatar.module.scss';

interface Props {
  alt?: string;
  src: string;
  className?: string;
  text?: string;
}

const AppAvatar: FC<Props & HTMLAttributes<HTMLDivElement>> = ({
  src,
  alt,
  className,
  text,
  ...other
}) => {
  const classes = clsx(className, styles.avatar);
  return (
    <div className={classes} {...other}>
      <img className={styles.avatar__img} src={src} alt={alt} />
      {text && <span className={styles.avatar__text}>{text}</span>}
    </div>
  );
};

AppAvatar.defaultProps = {
  alt: undefined,
  className: undefined,
  text: undefined,
};

export default AppAvatar;
