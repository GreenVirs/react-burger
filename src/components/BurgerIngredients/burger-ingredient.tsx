import { FC } from "react";
import PriceItem from "../PriceItem/price-item";
import { Ingredient, ingredientPropType } from "../../models/ingridient";
import ingredientsStyle from './burger-ingredients.module.css';
import PropTypes from "prop-types";

const propTypes = {
    ...ingredientPropType,
    count: PropTypes.number
}

type Props = Ingredient & { count?: number };

const BurgerIngredient: FC<Props> = (props) => {
    return (<li className={`pr-4 pl-4 pt-6 pb-10 ${ingredientsStyle.ingredient}`}>
        <span className={'pl-4 pr-4'}>
            <img src={props.image} alt={props.name}/>
        </span>
        <PriceItem price={props.price} />
        <h3 className={`mt-1 text text_type_main-default ${ingredientsStyle.ingredient__name}`}>{props.name}</h3>
        { typeof props.count !== 'undefined' && <span className={`text text_type_digits-default ${ingredientsStyle.ingredient__count}`}>{ props.count }</span> }
    </li>)
}

BurgerIngredient.propTypes = propTypes;

export default BurgerIngredient;