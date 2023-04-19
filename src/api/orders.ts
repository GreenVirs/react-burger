import { create } from './common';
import { IOrder } from '../models/order';

export const createOrder = (data: { ingredients: string[] }) => create<IOrder>('orders', data);
