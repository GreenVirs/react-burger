import { Reducer } from 'redux';
import { Order } from '../../models/order';
import { ORDER } from '../actions/order';

interface OrderState {
  order: Order | null;
}

const initState: OrderState = {
  order: null,
};

type OrderAction =
  | {
      type: ORDER.SET;
      order: Order;
    }
  | { type: ORDER.CLEAR };

export const orderReducer: Reducer<OrderState, OrderAction> = (state = initState, action) => {
  switch (action.type) {
    case ORDER.SET: {
      return {
        ...state,
        order: action.order,
      };
    }
    case ORDER.CLEAR: {
      return {
        ...state,
        order: null,
      };
    }
    default: {
      return state;
    }
  }
};
