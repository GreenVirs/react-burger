import {FC, useMemo} from "react";
import IngredientsList from "./ingredients-list";
import { Ingredient, ingredientPropType } from "../../models/ingridient";
import ConstructorIngredient from "./constructor-ingredient";
import constructorStyles from './burger-constructor.module.css';
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import PriceItem from "../PriceItem/price-item";
import PropTypes from "prop-types";

const propTypes = {
    items: PropTypes.arrayOf(ingredientPropType).isRequired
}

type Props = {
    items: Ingredient[]
}

const BurgerConstructor: FC<Props> = (props) => {
    const items = useMemo(() => {
        const { length, 0: firstItem, [length - 1]: lastItem } = props.items;
        const ingredients = [...props.items].splice(1, length - 2);
        return { firstItem, lastItem, ingredients }
    }, [props.items]);

    const total = useMemo(() => {
        const totalIngredients = items.ingredients.reduce((acc, item) => acc += item.price, 0);
        return totalIngredients + items.firstItem.price;
    }, [items.ingredients, items.firstItem]);

    return (<div className={`pt-25 pb-4 ${constructorStyles.constructor}`}>
        <ConstructorIngredient className={'mb-4'} first {...items.firstItem} />
        <IngredientsList items={items.ingredients} />
        <ConstructorIngredient  className={'mt-4'} last {...items.firstItem} />
        <div className={`mt-10 ${constructorStyles.result}`}>
            <PriceItem large price={total} />
            <Button htmlType={'button'}>Оформить заказ</Button>
        </div>
    </div>)
}

BurgerConstructor.propTypes = propTypes;

export default BurgerConstructor;