import { FC } from 'react';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PriceItem from '../../price-item/price-item';
import { Ingredient } from '../../../models/ingridient';
import ingredientsStyle from './burger-ingredient.module.scss';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../../modal/modal';
import { useModalControl } from '../../../hooks/use-modal-control';

interface Props {
  ingredient: Ingredient;
  count?: number;
}

const BurgerIngredient: FC<Props> = ({ ingredient, count }) => {
  const { isOpen, onOpenModal, onCloseModal } = useModalControl(false);

  return (
    <>
      <li className={`pr-4 pl-4 pt-6 pb-10 ${ingredientsStyle.ingredient}`}>
        <span className="pl-4 pr-4">
          <img src={ingredient.image} alt={ingredient.name} />
        </span>
        <PriceItem price={ingredient.price} />
        <button
          type="button"
          onClick={onOpenModal}
          className={ingredientsStyle['ingredient__btn-title']}
        >
          <h3 className={`mt-1 text text_type_main-default ${ingredientsStyle.ingredient__name}`}>
            {ingredient.name}
          </h3>
        </button>
        {typeof count !== 'undefined' && (
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

BurgerIngredient.defaultProps = {
  count: undefined,
};

export default BurgerIngredient;
