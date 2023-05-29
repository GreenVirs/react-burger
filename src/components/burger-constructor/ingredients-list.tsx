import { FC, useCallback, useMemo } from 'react';
import constructorStyles from './burger-constructor.module.scss';
import { SORT_ITEMS, selectConstructor } from '../../services/reducers/constructor';
import ConstructorIngredientSortable from './constructor-ingredient-sortable';
import { useRootSelector } from '../../hooks/use-root-selector';
import { useAppDispatch } from '../../hooks/use-app-dispatch';

const IngredientsList: FC = () => {
  const { ingredients } = useRootSelector(selectConstructor);
  const dispatch = useAppDispatch();
  const onMoveItem = useCallback(
    (from: number, to: number) => {
      dispatch(SORT_ITEMS({ from, to }));
    },
    [dispatch]
  );
  const items = useMemo(
    () =>
      ingredients.map(({ ingredient, id }, index) => (
        <ConstructorIngredientSortable
          key={id}
          id={id}
          index={index}
          moveItem={onMoveItem}
          ingredient={ingredient}
        />
      )),
    [ingredients, onMoveItem]
  );
  return <div className={constructorStyles.item__list}>{items}</div>;
};

export default IngredientsList;
