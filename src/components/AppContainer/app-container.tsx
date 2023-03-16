import containerStyles from './app-container.module.css';
import { FC, PropsWithChildren } from "react";

type Props = PropsWithChildren;

const AppContainer: FC<Props> = (props) => {
    return (<div className={containerStyles.container}>
        {props.children}
    </div>)
}

export default AppContainer;