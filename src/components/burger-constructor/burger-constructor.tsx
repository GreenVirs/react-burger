import {FC, useMemo } from "react";
import IngredientsList from "./ingredients-list";
import { Ingredient } from "../../models/ingridient";
import ConstructorIngredient from "./constructor-ingredient";
import constructorStyles from './burger-constructor.module.css';
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import PriceItem from "../price-item/price-item";
import OrderDetails from "./order-details";
import Modal from "../modal/modal";
import { useModalControl } from "../../hooks/use-modal-control";

type Props = {
    items: Ingredient[]
}

const BurgerConstructor: FC<Props> = (props) => {
    const { isOpen, onOpenModal, onCloseModal } = useModalControl(false);

    const items = useMemo(() => {
        const { length, 0: firstItem, [length - 1]: lastItem } = props.items;
        const ingredients = [...props.items].filter((item) => {
            return item.type !== 'bun';
        });
        return { firstItem, lastItem, ingredients }
    }, [props.items]);

    const total = useMemo(() => {
        const totalIngredients = items.ingredients.reduce((acc, item) => acc += item.price, 0);
        return totalIngredients + items.firstItem?.price ?? 0;
    }, [items.ingredients, items.firstItem]);

    return (
        <div className={`pt-25 pb-4 ${constructorStyles.constructor}`}>
            <ConstructorIngredient className={'mb-4'} first {...items.firstItem} />
            <IngredientsList items={items.ingredients} />
            <ConstructorIngredient  className={'mt-4'} last {...items.firstItem} />
            <div className={`mt-10 ${constructorStyles.result}`}>
                <PriceItem large price={total} />
                <Button onClick={onOpenModal} htmlType={'button'}>Оформить заказ</Button>
            </div>
            { isOpen && (<Modal onClose={onCloseModal}>
                <OrderDetails />
            </Modal>)
            }
        </div>)
}

export default BurgerConstructor;