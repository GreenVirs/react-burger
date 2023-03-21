import { FC, useCallback, useContext, useMemo } from 'react';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { Ingredient } from '../../models/ingridient';
import constructorStyles from './burger-constructor.module.scss';
import { CONSTRUCTOR_ACTIONS_TYPE } from '../../services/actions/constructor';
import { ConstructorContext } from '../../services/constructor-context';

type Props = {
  ingredient: Ingredient;
  id: string;
  first?: boolean;
  last?: boolean;
  extraClass?: string;
};

const ConstructorIngredient: FC<Props> = ({ first, last, ingredient, extraClass, id }) => {
  const { dispatch } = useContext(ConstructorContext);
  const wrapperClasses = useMemo(
    () => clsx(constructorStyles.item__wrapper, extraClass),
    [extraClass]
  );

  const onRemoveItem = useCallback(() => {
    dispatch({ type: CONSTRUCTOR_ACTIONS_TYPE.REMOVE_ITEM, ingredient, id });
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
  return (
    <div className={wrapperClasses}>
      {!first && !last && <DragIcon type="primary" />}
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
};

ConstructorIngredient.defaultProps = {
  first: false,
  last: false,
  extraClass: undefined,
};

export default ConstructorIngredient;
