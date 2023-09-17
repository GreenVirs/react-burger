import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { useOrderIngredients } from '../../hooks/use-order-ingredients';
import { useOrderPrice } from '../../hooks/use-order-price';
import PriceItem from '../price-item/price-item';
import { Ingredient } from '../../models/ingridient';
import AppAvatar from '../app-avatar/app-avatar';
import styles from './order-info.module.scss';
import { useRootSelector } from '../../hooks/use-root-selector';
import { selectOrder, CLEAR_ORDER } from '../../services/reducers/order';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { GET_ORDER } from '../../services/actions/order';

const statuses = {
  done: { name: 'Выполнен', className: 'text_color_success' },
  pending: { name: 'Готовится', className: 'text_color_primary' },
  created: { name: 'Готовится', className: 'text_color_primary' },
  cancel: { name: 'Отменен', className: 'text_color_error' },
};
const OrderInfo: FC = () => {
  const { isLoading, order } = useRootSelector(selectOrder);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(GET_ORDER(id as string));
    return () => {
      dispatch(CLEAR_ORDER());
    };
  }, []);

  const ingredientsIds = order?.order.ingredients || [];
  const ingredients = useOrderIngredients(ingredientsIds);
  const calculateIngredients = useMemo(
    () =>
      Object.values(
        ingredients.reduce((acc, item) => {
          if (!(item._id in acc)) {
            acc[item._id] = { item, count: 0 };
          }
          acc[item._id].count++;
          return acc;
        }, {} as Record<string, { item: Ingredient; count: number }>)
      ),
    [ingredients]
  );
  const price = useOrderPrice(ingredients);

  if (isLoading) {
    return <div>Загрузка заказа</div>;
  }

  return (
    order && (
      <div className={styles['order-info']}>
        <div className={clsx(styles['order-info__number'], 'text text_type_digits-default')}>
          #{order.order.number}
        </div>
        <div className="mt-10 text text_type_main-medium">{order.name}</div>
        <div
          className={clsx(
            'mt-3 text text_type_main-default',
            statuses[order.order.status]?.className
          )}
        >
          {statuses[order.order.status]?.name}
        </div>
        <div className="mt-15 text text_type_main-medium">Состав:</div>
        <div className={clsx('mt-6 custom-scroll', styles['order-info__list'])}>
          {calculateIngredients.map(({ item: ingredient, count }, index) => (
            <div key={index} className={styles['order-info__item']}>
              <AppAvatar src={ingredient.image} />
              <span className="text text_type_main-default">{ingredient.name}</span>
              <div>
                {count !== 1 && (
                  <span className="text text_type_digits-default mr-2">{count} X</span>
                )}
                <PriceItem price={ingredient.price} />
              </div>
            </div>
          ))}
        </div>
        <div className={clsx(styles['order-info__footer'], 'mt-10')}>
          <FormattedDate
            date={new Date(order.order.createdAt)}
            className="text text_type_main-default text_color_inactive"
          />
          <PriceItem price={price} />
        </div>
      </div>
    )
  );
};

export default OrderInfo;
