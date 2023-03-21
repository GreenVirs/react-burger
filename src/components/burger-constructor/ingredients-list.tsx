import { FC, useContext, useMemo } from 'react';
import ConstructorIngredient from './constructor-ingredient';
import constructorStyles from './burger-constructor.module.scss';
import { ConstructorContext } from '../../services/constructor-context';

const IngredientsList: FC = () => {
  const { items: propsItems } = useContext(ConstructorContext);

  const items = useMemo(
    () =>
      Object.entries(propsItems.ingredients).map(([key, { ingredient }]) => (
        <ConstructorIngredient key={key} id={key} ingredient={ingredient} />
      )),
    [propsItems]
  );
  return <div className={constructorStyles.item__list}>{items}</div>;
};

export default IngredientsList;
