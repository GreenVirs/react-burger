import { FC, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import constructorStyles from './burger-constructor.module.scss';
import { SORT_ITEMS, ConstructorState } from '../../services/reducers/constructor';
import { RootState } from '../../store';
import ConstructorIngredientSortable from './constructor-ingredient-sortable';

const IngredientsList: FC = () => {
  const { ingredients } = useSelector<RootState, ConstructorState>((state) => state.builder);
  const dispatch = useDispatch();
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
