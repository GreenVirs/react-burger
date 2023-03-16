import IngredientAttributeList from "./ingredient-attribute-list";
import { FC } from "react";
import { Ingredient } from "../../models/ingridient";
import ingredientStyle from './burger-ingredients.module.css';

type Props = {
    ingredient: Ingredient
}
const IngredientDetails: FC<Props> = (props) => {
    return (
        <div className={ingredientStyle['ingredient-modal']}>
            <div className={'pr-5 pl-5'}>
                <img src={props.ingredient.image_large} alt={props.ingredient.name}/>
            </div>
            <span className={`mt-4 text text_type_main-medium ${ingredientStyle['ingredient-modal__name']}`}>{props.ingredient.name}</span>
            <IngredientAttributeList extraClass={'mt-8'} ingredient={props.ingredient} />
        </div>
    );
}

export default IngredientDetails;