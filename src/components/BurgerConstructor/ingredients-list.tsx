import {FC, useMemo} from "react";
import { Ingredient, ingredientPropType } from "../../models/ingridient";
import ConstructorIngredient from "./constructor-ingredient";
import constructorStyles from './burger-constructor.module.css';
import PropTypes from "prop-types";

const propTypes = {
    items: PropTypes.arrayOf(ingredientPropType).isRequired
}
type Props = {
    items: Ingredient[];
};
const IngredientsList: FC<Props> = (props) => {
    const items = useMemo(() => props.items.map((item: Ingredient) =>
        (<ConstructorIngredient key={item._id} {...item} />)), [props.items]);
    return <div className={`custom-scroll ${constructorStyles.item__list}`}>{ items }</div>
}

IngredientsList.propTypes = propTypes;

export default IngredientsList;