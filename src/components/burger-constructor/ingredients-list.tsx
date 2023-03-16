import { FC, useMemo } from 'react';
import { Ingredient } from '../../models/ingridient';
import ConstructorIngredient from './constructor-ingredient';
import constructorStyles from './burger-constructor.module.scss';

type Props = {
  items: Ingredient[];
};
const IngredientsList: FC<Props> = ({ items: propsItems }) => {
  const items = useMemo(
    () =>
      propsItems.map((item: Ingredient) => (
        <ConstructorIngredient key={item._id} ingredient={item} />
      )),
    [propsItems]
  );
  return <div className={`custom-scroll ${constructorStyles.item__list}`}>{items}</div>;
};

export default IngredientsList;
