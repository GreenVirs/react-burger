import { create, tunnel, SocketOptions, findOne } from './common';
import { IOrder } from '../models/order';
import { getToken } from './index';

export const createOrder = (data: { ingredients: string[] }) => create<IOrder>('orders', data);
export const getOrder = (id: string) => findOne<{ orders: IOrder[] }>(`orders/${id}`);
export const socketOrders = (options: SocketOptions) =>
  tunnel('wss://norma.nomoreparties.space/orders/all', options);

export const socketMyOrders = (options: SocketOptions) =>
  tunnel(`wss://norma.nomoreparties.space/orders?token=${getToken()}`, options);
