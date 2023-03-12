import { FC, useCallback, useState } from "react";
import PriceItem from "../PriceItem/price-item";
import { Ingredient, ingredientPropType } from "../../models/ingridient";
import ingredientsStyle from './burger-ingredients.module.css';
import PropTypes from "prop-types";
import IngredientDetails from "./ingredient-details";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";

const propTypes = {
    ...ingredientPropType,
    count: PropTypes.number
}

type Props = Ingredient & { count?: number };

const BurgerIngredient: FC<Props> = (props) => {
    const { count, ...ingredient } = props;
    const [isOpenModal, setIsOpenModal] = useState(false);

    const onCloseModal = useCallback(() => {
        setIsOpenModal(false);
    }, []);

    const onClick = useCallback(() => {
        setIsOpenModal(true)
    }, []);

    return (<>
        <li className={`pr-4 pl-4 pt-6 pb-10 ${ingredientsStyle.ingredient}`} onClick={onClick}>
            <span className={'pl-4 pr-4'}>
                <img src={ingredient.image} alt={ingredient.name}/>
            </span>
            <PriceItem price={ingredient.price} />
            <h3 className={`mt-1 text text_type_main-default ${ingredientsStyle.ingredient__name}`}>{ingredient.name}</h3>
            { typeof count !== 'undefined' && <Counter count={count} size="default" extraClass={ingredientsStyle.ingredient__count} /> }
        </li>
        <IngredientDetails
            ingredient={ingredient}
            isOpen={isOpenModal}
            onClose={onCloseModal}
        />
    </>)
}

BurgerIngredient.propTypes = propTypes;

export default BurgerIngredient;