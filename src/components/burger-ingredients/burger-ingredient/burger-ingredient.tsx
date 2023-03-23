import { FC, useCallback, useMemo } from 'react';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { v4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_ITEM, ConstructorState } from '../../../services/reducers/constructor';
import PriceItem from '../../price-item/price-item';
import { Ingredient } from '../../../models/ingridient';
import ingredientsStyle from './burger-ingredient.module.scss';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../../modal/modal';
import { useModalControl } from '../../../hooks/use-modal-control';
import { RootState } from '../../../store';

interface Props {
  ingredient: Ingredient;
}

const BurgerIngredient: FC<Props> = ({ ingredient }) => {
  const { isOpen, onOpenModal, onCloseModal } = useModalControl(false);
  const dispatch = useDispatch();
  const items = useSelector<RootState, ConstructorState>((state) => state.builder);
  const count = useMemo<number | null>(() => {
    if (ingredient.type !== 'bun') {
      const itemsList = Object.values(items.ingredients).filter(
        (item) => item.ingredient._id === ingredient._id
      );
      return itemsList.length || null;
    }

    if (items.bun === null) {
      return null;
    }
    return ingredient._id === items.bun._id ? 1 : null;
  }, [items, ingredient]);

  const onClickItem = useCallback(() => {
    dispatch(ADD_ITEM({ ingredient, id: v4() }));
    onOpenModal();
  }, [onOpenModal, dispatch, ingredient]);

  return (
    <>
      <li className={`pr-4 pl-4 pt-6 pb-10 ${ingredientsStyle.ingredient}`}>
        <span className="pl-4 pr-4">
          <img src={ingredient.image} alt={ingredient.name} />
        </span>
        <PriceItem price={ingredient.price} />
        <button
          type="button"
          onClick={onClickItem}
          className={ingredientsStyle['ingredient__btn-title']}
        >
          <h3 className={`mt-1 text text_type_main-default ${ingredientsStyle.ingredient__name}`}>
            {ingredient.name}
          </h3>
        </button>
        {count !== null && (
          <Counter count={count} size="default" extraClass={ingredientsStyle.ingredient__count} />
        )}
      </li>
      {isOpen && (
        <Modal onClose={onCloseModal} title="Детали ингредиента">
          <IngredientDetails ingredient={ingredient} />
        </Modal>
      )}
    </>
  );
};

export default BurgerIngredient;
