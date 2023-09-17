import { FC, useMemo } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import ingredientsStyle from '../burger-ingredients/burger-ingredient/burger-ingredient.module.scss';

interface Props {
  price: number;
  large?: boolean;
}
const PriceItem: FC<Props> = ({ large, price }) => {
  const priceClasses = useMemo(
    () =>
      clsx(
        'text',
        large ? 'text_type_digits-medium' : 'text_type_digits-default',
        ingredientsStyle.ingredient__price,
        { [ingredientsStyle['ingredients__price--large']]: large }
      ),
    [large]
  );
  return (
    <span className={priceClasses}>
      {price}
      <CurrencyIcon type="primary" />
    </span>
  );
};

PriceItem.defaultProps = {
  large: false,
};

export default PriceItem;
