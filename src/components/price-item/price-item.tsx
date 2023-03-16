import { FC } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientsStyle from '../burger-ingredients/burger-ingredients.module.scss';

interface Props {
  price: number;
  large?: boolean;
}
const PriceItem: FC<Props> = ({ large, price }) => (
  <span
    className={`mt-1 text ${large ? 'text_type_digits-medium' : 'text_type_digits-default'} ${
      ingredientsStyle.ingredient__price
    }${large ? ` ${ingredientsStyle['ingredients__price--large']}` : ''}`}
  >
    {price}
    <CurrencyIcon type="primary" />
  </span>
);

PriceItem.defaultProps = {
  large: false,
};

export default PriceItem;
