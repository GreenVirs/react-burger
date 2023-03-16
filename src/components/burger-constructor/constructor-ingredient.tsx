import { FC, useMemo } from 'react';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient } from '../../models/ingridient';
import constructorStyles from './burger-constructor.module.scss';

type Props = {
  ingredient: Ingredient;
  first?: boolean;
  last?: boolean;
  extraClass?: string;
};

const ConstructorIngredient: FC<Props> = ({ first, last, ingredient, extraClass }) => {
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
    <div className={`${constructorStyles.item__wrapper}${extraClass ? ` ${extraClass}` : ''}`}>
      {!first && !last && <DragIcon type="primary" />}
      <ConstructorElement
        extraClass={constructorStyles.item}
        price={ingredient.price}
        text={name}
        thumbnail={ingredient.image}
        isLocked={first || last}
        type={type}
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
