import { FC } from "react";
import ingredientsStyle from "../BurgerIngredients/burger-ingredients.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const propTypes = {
    price: PropTypes.number.isRequired,
    large: PropTypes.bool
}
interface Props {
    price: number
    large?: boolean
}
const PriceItem: FC<Props> = (props) => {
    return (<span
        className={`mt-1 text ${props.large ? 'text_type_digits-medium' : 'text_type_digits-default'} ${ingredientsStyle.ingredient__price}${props.large ? ` ${ingredientsStyle['ingredients__price--large']}` : ''}`}
    >
        { props.price }
        <CurrencyIcon type='primary' />
    </span>)
}

PriceItem.defaultProps = {
    large: false,
}

PriceItem.propTypes = propTypes;

export default PriceItem;