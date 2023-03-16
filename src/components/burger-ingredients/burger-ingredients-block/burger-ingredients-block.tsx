import { FC } from 'react';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import { Ingredient } from '../../../models/ingridient';
import ingredientsStyle from '../burger-ingredients.module.scss';

type Props = {
  title: string;
  id: string;
  items: Ingredient[];
};

const BurgerIngredientsBlock: FC<Props> = ({ items, id, title }) => (
  <div>
    <h2 id={id} className="text text_type_main-medium">
      {title}
    </h2>
    <ul className={ingredientsStyle.ingredients__list}>
      {items.map((item) => (
        <BurgerIngredient key={item._id} ingredient={item} />
      ))}
    </ul>
  </div>
);

export default BurgerIngredientsBlock;
