import { FC } from "react";
import PropTypes from "prop-types";
import burgerIngredientStyle from "./burger-ingredients.module.css";

const propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired
}

interface Props {
    title: string
    value: string | number
}
const IngredientAttribute: FC<Props> = (props) => {
    return (<div className={`text text_color_inactive text_type_main-default ${burgerIngredientStyle['ingredients-attribute']}`}>
        <span>
            {props.title}
        </span>
        <span>
            {props.value}
        </span>
    </div>)
}

IngredientAttribute.propTypes = propTypes;

export default IngredientAttribute;