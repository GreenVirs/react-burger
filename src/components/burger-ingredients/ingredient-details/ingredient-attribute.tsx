import { FC } from 'react';
import burgerIngredientStyle from '../burger-ingredients.module.scss';

interface Props {
  title: string;
  value: string | number;
}
const IngredientAttribute: FC<Props> = ({ title, value }) => (
  <div
    className={`text text_color_inactive text_type_main-default ${burgerIngredientStyle['ingredients-attribute']}`}
  >
    <span>{title}</span>
    <span>{value}</span>
  </div>
);

export default IngredientAttribute;
