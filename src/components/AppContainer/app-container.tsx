import containerStyles from './app-container.module.css';
import { FC, PropsWithChildren } from "react";
import PropTypes from "prop-types";

type Props = PropsWithChildren;

const AppContainer: FC<Props> = (props) => {
    return (<div className={containerStyles.container}>
        {props.children}
    </div>)
}

AppContainer.propTypes = {
    children: PropTypes.element.isRequired
}

export default AppContainer;