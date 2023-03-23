import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import ingredientsStyles from './burger-ingredients.module.scss';
import { Ingredient } from '../../models/ingridient';
import BurgerIngredientsBlock, { Ref } from './burger-ingredients-block/burger-ingredients-block';
import { useIntersectionObserver } from '../../hooks/use-intersection-observer';
import { RootState } from '../../store';

const BurgerIngredients: FC = () => {
  const { items } = useSelector<RootState, { items: Ingredient[] }>((state) => state.ingredients);
  const [current, setCurrent] = useState('bun');
  const bunRef = useRef<Ref>(null);
  const sauceRef = useRef<Ref>(null);
  const mainRef = useRef<Ref>(null);
  const rootRef = useRef(null);

  const callbackObserver: IntersectionObserverCallback = (entries) => {
    const position = entries.map((entry) => entry);

    console.log('position', position);
  };

  const observerOptions = useMemo(() => ({ root: rootRef.current }), []);
  useIntersectionObserver([bunRef, sauceRef, mainRef], callbackObserver, observerOptions);

  const { bun, sauce, main } = useMemo(() => {
    const values: Record<Ingredient['type'], Ingredient[]> = { bun: [], main: [], sauce: [] };
    if (items === null) {
      return values;
    }
    return items.reduce((acc, item) => {
      acc[item.type].push(item);
      return acc;
    }, values);
  }, [items]);

  return (
    <div className={ingredientsStyles.ingredients}>
      <h1 className="mb-5 text text_type_main-large">Соберите бургер</h1>
      <header className="mb-10">
        <ul className={ingredientsStyles.tabs}>
          <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
            Булки
          </Tab>
          <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
            Соусы
          </Tab>
          <Tab value="main" active={current === 'main'} onClick={setCurrent}>
            Начинки
          </Tab>
        </ul>
      </header>
      <div
        ref={rootRef}
        className={`custom-scroll ${ingredientsStyles['ingredients__blocks-list']}`}
      >
        <BurgerIngredientsBlock ref={bunRef} id="bun" title="Булки" items={bun} />
        <BurgerIngredientsBlock ref={sauceRef} id="sauce" title="Соусы" items={sauce} />
        <BurgerIngredientsBlock ref={mainRef} id="main" title="Начинки" items={main} />
      </div>
    </div>
  );
};

export default BurgerIngredients;
