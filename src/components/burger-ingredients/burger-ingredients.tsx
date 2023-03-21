import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useCallback, useMemo, useReducer, useRef } from 'react';
import ingredientsStyles from './burger-ingredients.module.scss';
import { Ingredient, IngredientTypes } from '../../models/ingridient';
import BurgerIngredientsBlock, { Ref } from './burger-ingredients-block/burger-ingredients-block';

type Props = {
  items: Ingredient[] | null;
};

const BurgerIngredients: FC<Props> = ({ items }) => {
  const bunRef = useRef<Ref<HTMLDivElement>>(null);
  const sauceRef = useRef<Ref<HTMLDivElement>>(null);
  const mainRef = useRef<Ref<HTMLDivElement>>(null);

  const [current, setCurrent] = useReducer(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,default-param-last
    (state = 'bun', action: { type: 'scroll' | 'set'; value: IngredientTypes }) => {
      switch (action.value) {
        case 'bun': {
          if (action.type === 'scroll' && bunRef.current !== null) {
            bunRef.current.scrollIntoView({ behavior: 'smooth' });
          }
          return action.value;
        }
        case 'sauce': {
          if (action.type === 'scroll' && sauceRef.current !== null) {
            sauceRef.current.scrollIntoView({ behavior: 'smooth' });
          }
          return action.value;
        }
        case 'main': {
          if (action.type === 'scroll' && mainRef.current !== null) {
            mainRef.current.scrollIntoView({ behavior: 'smooth' });
          }
          return action.value;
        }
        default: {
          if (bunRef.current !== null) {
            bunRef.current.scrollIntoView({ behavior: 'smooth' });
          }
          return 'bun';
        }
      }
    },
    'bun'
  );

  const onScrollTo = useCallback(
    (value: string) => {
      setCurrent({ type: 'scroll', value } as { type: 'scroll'; value: IngredientTypes });
    },
    [setCurrent]
  );

  const onVisible = useCallback(
    (value: string) => {
      setCurrent({ type: 'set', value } as { type: 'set'; value: IngredientTypes });
    },
    [setCurrent]
  );

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
          <Tab value="bun" active={current === 'bun'} onClick={onScrollTo}>
            Булки
          </Tab>
          <Tab value="sauce" active={current === 'sauce'} onClick={onScrollTo}>
            Соусы
          </Tab>
          <Tab value="main" active={current === 'main'} onClick={onScrollTo}>
            Начинки
          </Tab>
        </ul>
      </header>
      <div className={`custom-scroll ${ingredientsStyles['ingredients__blocks-list']}`}>
        <BurgerIngredientsBlock
          ref={bunRef}
          id="bun"
          title="Булки"
          items={bun}
          onVisible={onVisible}
        />
        <BurgerIngredientsBlock
          ref={sauceRef}
          id="sauce"
          title="Соусы"
          items={sauce}
          onVisible={onVisible}
        />
        <BurgerIngredientsBlock
          ref={mainRef}
          id="main"
          title="Начинки"
          items={main}
          onVisible={onVisible}
        />
      </div>
    </div>
  );
};

export default BurgerIngredients;
