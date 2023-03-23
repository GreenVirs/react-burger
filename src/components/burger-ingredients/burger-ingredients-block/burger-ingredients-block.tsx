import { forwardRef } from 'react';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import { Ingredient, IngredientTypes } from '../../../models/ingridient';
import ingredientsStyle from '../burger-ingredients.module.scss';

type Props = {
  title: string;
  id: IngredientTypes;
  items: Ingredient[];
};

export type Ref<T extends HTMLElement = HTMLHeadingElement> = T;

const BurgerIngredientsBlock = forwardRef<Ref, Props>(({ items, id, title }, ref) => (
  <div>
    <h2 ref={ref} id={id} className="text text_type_main-medium">
      {title}
    </h2>
    <ul className={ingredientsStyle.ingredients__list}>
      {items.map((item) => (
        <BurgerIngredient key={item._id} ingredient={item} />
      ))}
    </ul>
  </div>
));

export default BurgerIngredientsBlock;
