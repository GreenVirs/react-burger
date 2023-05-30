import { create, findOne } from './common';
import { IOrder, Order } from '../models/order';

export const createOrder = (data: { ingredients: string[] }) => create<IOrder>('orders', data);
export const getOrder = (id: string) => findOne<{ orders: Order[] }>(`orders/${id}`);
