import { CSSProperties, FC } from 'react';
import { Ingredient } from '../../models/ingridient';
import AppAvatar from '../app-avatar/app-avatar';
import styles from './orders-list.module.scss';

interface Props {
  ingredients: Ingredient[];
}
const OrderIngredientsList: FC<Props> = ({ ingredients }) => {
  if (ingredients.length <= 6) {
    return (
      <div className={styles['orders-ingredients-list']}>
        {ingredients.map((item, index) => (
          <AppAvatar
            style={{ '--z-index-count': ingredients.length - index } as CSSProperties}
            className={styles['orders-ingredients-list__item']}
            key={index}
            src={item.image}
            alt={item.name}
          />
        ))}
      </div>
    );
  }

  const tempIngredients = [...ingredients];
  const otherIngredients = tempIngredients.splice(5);

  return (
    <div className={styles['orders-ingredients-list']}>
      {tempIngredients.map((item, index) => (
        <AppAvatar
          style={{ '--z-index-count': tempIngredients.length - index } as CSSProperties}
          className={styles['orders-ingredients-list__item']}
          key={index}
          src={item.image}
          alt={item.name}
        />
      ))}
      {otherIngredients.length && (
        <AppAvatar
          data-count="0"
          className={styles['orders-ingredients-list__item']}
          src={otherIngredients[0].image}
          alt={otherIngredients[0].name}
          text={`+${otherIngredients.length}`}
        />
      )}
    </div>
  );
};

export default OrderIngredientsList;
