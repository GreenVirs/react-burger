import { FC, PropsWithChildren, useMemo } from 'react';
import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils';
import { clsx } from 'clsx';
import { NavLink, LinkProps } from 'react-router-dom';
import linkStyles from './navigation-link.module.scss';

type Props = PropsWithChildren<
  LinkProps & {
    icon?: FC<TIconProps>;
    large?: boolean;
  }
>;

const NavigationLink: FC<Props> = ({ icon: Icon, children, large, ...linkProps }) => {
  const linkSize = useMemo(
    () => (large ? linkStyles['link--large'] : linkStyles['link--small']),
    [large]
  );
  const setClasses = (isActive: boolean) =>
    clsx(`text_color_${isActive ? 'primary' : 'inactive'}`, linkStyles.link, linkSize);
  const setChildren = (isActive: boolean) => (
    <>
      {Icon && (
        <span className={clsx('ml-2', linkStyles.link__icon)}>
          <Icon type={isActive ? 'primary' : 'secondary'} />
        </span>
      )}
      {children}
    </>
  );
  return (
    <NavLink className={({ isActive }) => setClasses(isActive)} {...linkProps}>
      {({ isActive }) => setChildren(isActive)}
    </NavLink>
  );
};

NavigationLink.defaultProps = {
  icon: undefined,
  large: false,
};

export default NavigationLink;
