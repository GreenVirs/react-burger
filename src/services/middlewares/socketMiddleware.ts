import { Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch } from '../../store';
import { socketOrders, socketMyOrders } from '../../api/orders';
import { ORDER_ACTIONS_TYPE } from '../actions/order';
import { WS_ALL_OPEN, WS_ALL_MESSAGE, WS_ME_MESSAGE, WS_ME_OPEN } from '../reducers/order';

export const socketMiddleware: Middleware = (store: MiddlewareAPI<AppDispatch>) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let _socketOrders: ReturnType<typeof socketOrders> | null = null;
  let _socketMyOrders: ReturnType<typeof socketMyOrders> | null = null;
  return (next) => (action) => {
    switch (action.type) {
      case ORDER_ACTIONS_TYPE.WS_ALL_CONNECT:
        _socketOrders = socketOrders({
          onMessage: (event) => {
            store.dispatch(WS_ALL_MESSAGE(event));
          },
          onOpen: () => {
            store.dispatch(WS_ALL_OPEN());
          },
          onError: (event) => {
            console.log('error', event);
          },
          onClose: () => {
            console.log('close');
            _socketOrders = null;
          },
        });
        break;

      case ORDER_ACTIONS_TYPE.WS_ALL_CLOSE:
        _socketOrders && _socketOrders.close();
        break;
      case ORDER_ACTIONS_TYPE.WS_ME_CONNECT:
        _socketMyOrders = socketMyOrders({
          onMessage: (event) => {
            store.dispatch(WS_ME_MESSAGE(event));
          },
          onOpen: () => {
            store.dispatch(WS_ME_OPEN());
          },
          onError: (event) => {
            console.log('error', event);
          },
          onClose: () => {
            console.log('close');
            _socketOrders = null;
          },
        });
        break;

      case ORDER_ACTIONS_TYPE.WS_ME_CLOSE:
        _socketMyOrders && _socketMyOrders.close();
        break;
      default: {
        next(action);
      }
    }
  };
};
