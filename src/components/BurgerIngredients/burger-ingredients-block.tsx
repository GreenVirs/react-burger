import { FC } from "react";
import BurgerIngredient from "./burger-ingredient";
import { Ingredient, ingredientPropType } from "../../models/ingridient";
import ingredientsStyle from './burger-ingredients.module.css'
import PropTypes from "prop-types";

const propTypes = {
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(ingredientPropType).isRequired
}

type Props = {
    title: string;
    id: string;
    items: Ingredient[]
}

const BurgerIngredientsBlock: FC<Props> = (props) => {
    return (<div>
        <h2 id={props.id} className={'text text_type_main-medium'}>{props.title}</h2>
        <ul className={ingredientsStyle.ingredients__list}>{
            props.items.map((item) => (<BurgerIngredient key={item._id} {...item} />))
        }</ul>
    </div>)
}

BurgerIngredientsBlock.propTypes = propTypes;

export default BurgerIngredientsBlock;