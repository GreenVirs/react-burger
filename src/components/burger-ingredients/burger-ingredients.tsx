import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import ingredientsStyles from './burger-ingredients.module.scss';
import { Ingredient } from '../../models/ingridient';
import BurgerIngredientsBlock from './burger-ingredients-block/burger-ingredients-block';
import { RootState } from '../../store';
import { useIngredientsTabsControl } from '../../hooks/use-ingredients-tabs-control';

const BurgerIngredients: FC = () => {
  const { items } = useSelector<RootState, { items: Ingredient[] }>((state) => state.ingredients);

  const { currentTab, bunRef, sauceRef, mainRef, rootRef, onScrollTo } =
    useIngredientsTabsControl();

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
    <div ref={rootRef} className={ingredientsStyles.ingredients}>
      <h1 className="mb-5 text text_type_main-large">Соберите бургер</h1>
      <header className="mb-10">
        <ul className={ingredientsStyles.tabs}>
          <Tab value="bun" active={currentTab === 'bun'} onClick={onScrollTo}>
            Булки
          </Tab>
          <Tab value="sauce" active={currentTab === 'sauce'} onClick={onScrollTo}>
            Соусы
          </Tab>
          <Tab value="main" active={currentTab === 'main'} onClick={onScrollTo}>
            Начинки
          </Tab>
        </ul>
      </header>
      <div className={`custom-scroll ${ingredientsStyles['ingredients__blocks-list']}`}>
        <BurgerIngredientsBlock ref={bunRef} id="bun" title="Булки" items={bun} />
        <BurgerIngredientsBlock ref={sauceRef} id="sauce" title="Соусы" items={sauce} />
        <BurgerIngredientsBlock ref={mainRef} id="main" title="Начинки" items={main} />
      </div>
    </div>
  );
};

export default BurgerIngredients;
