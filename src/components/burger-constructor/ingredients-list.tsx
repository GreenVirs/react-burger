import { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import ConstructorIngredient from './constructor-ingredient';
import constructorStyles from './burger-constructor.module.scss';
import { ConstructorState } from '../../services/reducers/constructor';
import { RootState } from '../../store';

const IngredientsList: FC = () => {
  const { ingredients } = useSelector<RootState, ConstructorState>((state) => state.builder);

  const items = useMemo(
    () =>
      Object.entries(ingredients).map(([key, { ingredient }]) => (
        <ConstructorIngredient key={key} id={key} ingredient={ingredient} />
      )),
    [ingredients]
  );
  return <div className={constructorStyles.item__list}>{items}</div>;
};

export default IngredientsList;
