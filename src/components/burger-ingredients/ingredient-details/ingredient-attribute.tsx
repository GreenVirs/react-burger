import { FC } from 'react';
import burgerIngredientStyle from './ingredient-details.module.scss';

interface Props {
  title: string;
  value: string | number;
}

const IngredientAttribute: FC<Props> = ({ title, value }) => (
  <div className={burgerIngredientStyle['ingredients-attribute']}>
    <span>{title}</span>
    <span>{value}</span>
  </div>
);

export default IngredientAttribute;
