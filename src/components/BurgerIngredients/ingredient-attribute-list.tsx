import { FC } from 'react';
import { Ingredient, ingredientPropType } from "../../models/ingridient";
import IngredientAttribute from "./ingredient-attribute";
import burgerIngredientsStyle from './burger-ingredients.module.css'
import PropTypes from "prop-types";

const propTypes = {
    ingredient: ingredientPropType,
    extraClass: PropTypes.string
}

interface Props {
    ingredient: Ingredient
    extraClass?: string
}

const IngredientAttributeList: FC<Props> = (props) => {
    return (<div className={`${burgerIngredientsStyle['ingredients-attributes']}${props.extraClass ? ` ${props.extraClass}` : ''}`}>
        <IngredientAttribute value={props.ingredient.calories} title={'Калории, ккал'} />
        <IngredientAttribute value={props.ingredient.proteins} title={'Белки, г'} />
        <IngredientAttribute value={props.ingredient.fat} title={'Жиры, г'} />
        <IngredientAttribute value={props.ingredient.carbohydrates} title={'Углеводы, г'} />
    </div>)
}

IngredientAttributeList.propTypes = propTypes;

export default IngredientAttributeList;