import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useMemo, useState } from 'react';
import ingredientsStyles from './burger-ingredients.module.scss';
import { Ingredient } from '../../models/ingridient';
import BurgerIngredientsBlock from './burger-ingredients-block/burger-ingredients-block';

type Props = {
  items: Ingredient[];
};

const BurgerIngredients: FC<Props> = ({ items }) => {
  const [current, setCurrent] = useState('bun');
  const { bun, sauce, main } = useMemo(
    () =>
      items.reduce(
        (acc, item) => {
          acc[item.type].push(item);
          return acc;
        },
        { bun: [], main: [], sauce: [] } as Record<Ingredient['type'], Ingredient[]>
      ),
    [items]
  );

  return (
    <div className={`pt-10 ${ingredientsStyles.ingredients}`}>
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
      <div className={`custom-scroll ${ingredientsStyles['ingredients__blocks-list']}`}>
        <BurgerIngredientsBlock id="bun" title="Булки" items={bun} />
        <BurgerIngredientsBlock id="sauce" title="Соусы" items={sauce} />
        <BurgerIngredientsBlock id="main" title="Начинки" items={main} />
      </div>
    </div>
  );
};

export default BurgerIngredients;
