import linkStyles from './navigation-link.module.css';
import { useMemo, FC, PropsWithChildren } from "react";
import { TIconProps } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils";

type Props = PropsWithChildren<{
    active?: boolean,
    href: string,
    icon?: FC<TIconProps>
}>

const NavigationLink: FC<Props> = (props) => {
    const { icon: Icon, active } = props;
    const iconType = useMemo(() => active ? 'primary' : 'secondary', [active]);
    const textColor = useMemo(() => active ? 'primary' : 'inactive', [active]);

    return (<a className={`pr-5 pl-5 text text_type_main-default ${`text_color_${textColor}`} ${linkStyles.link}`} href={props.href}>
        {
            Icon && <span className='ml-2'>
                <Icon type={iconType} />
            </span>
        }
        {props.children}
    </a>)
}

NavigationLink.defaultProps = {
    active: false
}

export default NavigationLink;