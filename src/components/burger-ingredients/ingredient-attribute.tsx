import { FC } from "react";
import burgerIngredientStyle from "./burger-ingredients.module.css";

interface Props {
    title: string
    value: string | number
}
const IngredientAttribute: FC<Props> = (props) => {
    return (
        <div className={`text text_color_inactive text_type_main-default ${burgerIngredientStyle['ingredients-attribute']}`}>
            <span>
                {props.title}
            </span>
            <span>
                {props.value}
            </span>
        </div>)
}

export default IngredientAttribute;