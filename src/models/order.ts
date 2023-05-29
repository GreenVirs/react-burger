type OrderStatuses = 'done' | 'pending' | 'created';
export interface Order {
  number: number;
  name: string;
  ingredients: string[];
  status: OrderStatuses;
  createdAt: string;
  updatedAt: string;
}
export interface IOrder {
  name: string;
  order: Order;
}
