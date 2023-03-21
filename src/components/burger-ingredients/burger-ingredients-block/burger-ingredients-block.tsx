import { forwardRef, RefObject, useCallback } from 'react';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import { Ingredient, IngredientTypes } from '../../../models/ingridient';
import ingredientsStyle from '../burger-ingredients.module.scss';
import { useIntersectionObserver } from '../../../hooks/use-intersection-observer';

type Props = {
  title: string;
  id: IngredientTypes;
  items: Ingredient[];
  onVisible?: (value: IngredientTypes) => void;
};

export type Ref<T extends HTMLElement = HTMLElement> = T;

const BurgerIngredientsBlock = forwardRef<Ref<HTMLDivElement>, Props>(
  ({ items, id, title, onVisible }, ref) => {
    const intersectionCallback = useCallback(
      (entry: IntersectionObserverEntry) => {
        if (typeof onVisible !== 'undefined' && entry.isIntersecting) {
          onVisible(id);
        }
      },
      [onVisible, id]
    );
    useIntersectionObserver(ref as RefObject<HTMLDivElement>, intersectionCallback);
    return (
      <div ref={ref}>
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
  }
);

BurgerIngredientsBlock.defaultProps = {
  onVisible: undefined,
};

export default BurgerIngredientsBlock;
