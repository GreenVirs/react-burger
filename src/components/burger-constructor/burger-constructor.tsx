import { FC, useMemo } from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsList from './ingredients-list';
import { Ingredient } from '../../models/ingridient';
import ConstructorIngredient from './constructor-ingredient';
import constructorStyles from './burger-constructor.module.scss';
import PriceItem from '../price-item/price-item';
import OrderDetails from './order-details';
import Modal from '../modal/modal';
import { useModalControl } from '../../hooks/use-modal-control';

type Props = {
  items: Ingredient[];
};

const BurgerConstructor: FC<Props> = ({ items: propItems }) => {
  const { isOpen, onOpenModal, onCloseModal } = useModalControl(false);

  const items = useMemo(
    () =>
      [...propItems].reduce(
        (acc, item) => {
          if (item.type !== 'bun') {
            acc.ingredients.push(item);
          } else {
            acc.bun.push(item);
          }
          return acc;
        },
        { bun: [], ingredients: [] } as { bun: Ingredient[]; ingredients: Ingredient[] }
      ),
    [propItems]
  );

  const total = useMemo(() => {
    const totalIngredients = items.ingredients.reduce((acc, item) => {
      acc += item.price;
      return acc;
    }, 0);
    if (typeof items.bun[0] !== 'undefined') {
      return totalIngredients + items.bun[0].price;
    }
    return totalIngredients;
  }, [items.ingredients, items.bun]);

  return (
    <div className={`pt-25 pb-4 ${constructorStyles.constructor}`}>
      {items.bun[0] && <ConstructorIngredient extraClass="mb-4" first ingredient={items.bun[0]} />}
      <IngredientsList items={items.ingredients} />
      {items.bun[0] && <ConstructorIngredient extraClass="mt-4" last ingredient={items.bun[0]} />}
      <div className={`mt-10 ${constructorStyles.result}`}>
        <PriceItem large price={total} />
        <Button onClick={onOpenModal} htmlType="button">
          Оформить заказ
        </Button>
      </div>
      {isOpen && (
        <Modal onClose={onCloseModal}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
};

export default BurgerConstructor;
