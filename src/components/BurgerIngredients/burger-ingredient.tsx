import { FC } from "react";
import PriceItem from "../PriceItem/price-item";
import { Ingredient } from "../../models/ingridient";
import ingredientsStyle from './burger-ingredients.module.css';
import IngredientDetails from "./ingredient-details";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/modal";
import { useModalControl } from "../../hooks/use-modal-control";

type Props = Ingredient & { count?: number };

const BurgerIngredient: FC<Props> = (props) => {
    const { count, ...ingredient } = props;
    const { isOpen, onOpenModal, onCloseModal } = useModalControl(false);

    return (<>
        <li className={`pr-4 pl-4 pt-6 pb-10 ${ingredientsStyle.ingredient}`} onClick={onOpenModal}>
            <span className={'pl-4 pr-4'}>
                <img src={ingredient.image} alt={ingredient.name}/>
            </span>
            <PriceItem price={ingredient.price} />
            <h3 className={`mt-1 text text_type_main-default ${ingredientsStyle.ingredient__name}`}>{ingredient.name}</h3>
            { typeof count !== 'undefined' && <Counter count={count} size="default" extraClass={ingredientsStyle.ingredient__count} /> }
        </li>
        {
            isOpen && (<Modal onClose={onCloseModal} title={'Детали ингредиента'} >
                <IngredientDetails ingredient={ingredient} />
            </Modal>)
        }

    </>)
}

export default BurgerIngredient;