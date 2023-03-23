import { useCallback, useMemo, forwardRef } from 'react';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { useDispatch } from 'react-redux';
import { Ingredient } from '../../models/ingridient';
import constructorStyles from './burger-constructor.module.scss';
import { REMOVE_ITEM } from '../../services/reducers/constructor';

export type ConstructorIngredientProps = {
  ingredient: Ingredient;
  id: string;
  first?: boolean;
  last?: boolean;
  extraClass?: string;
  opacity?: number;
};

type Ref<T extends HTMLElement = HTMLElement> = T;

const ConstructorIngredient = forwardRef<Ref<HTMLDivElement>, ConstructorIngredientProps>(
  ({ first, last, ingredient, extraClass, id, opacity }, ref) => {
    const dispatch = useDispatch();
    const wrapperClasses = useMemo(
      () => clsx(constructorStyles.item__wrapper, extraClass),
      [extraClass]
    );

    const onRemoveItem = useCallback(() => {
      dispatch(REMOVE_ITEM({ ingredient, id }));
    }, [dispatch, ingredient, id]);

    const name = useMemo(
      () => `${ingredient.name}${first ? ' (верх)' : ''}${last ? ' (низ)' : ''}`,
      [ingredient.name, first, last]
    );
    const type = useMemo(() => {
      switch (true) {
        case first:
          return 'top';
        case last:
          return 'bottom';
        default:
          return undefined;
      }
    }, [first, last]);

    const showDrag = useMemo(() => !first && !last, [first, last]);

    return (
      <div className={wrapperClasses} ref={ref} style={{ opacity }}>
        {showDrag && <DragIcon type="primary" />}
        <ConstructorElement
          extraClass={constructorStyles.item}
          price={ingredient.price}
          text={name}
          thumbnail={ingredient.image}
          isLocked={first || last}
          type={type}
          handleClose={onRemoveItem}
        />
      </div>
    );
  }
);

ConstructorIngredient.defaultProps = {
  first: false,
  last: false,
  extraClass: undefined,
  opacity: undefined,
};

export default ConstructorIngredient;
