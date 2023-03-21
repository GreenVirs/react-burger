import { mande } from 'mande';

const BASE_URL = 'https://norma.nomoreparties.space/api';

export const ingredientsApi = mande(`${BASE_URL}/ingredients`);

export const ordersApi = mande(`${BASE_URL}/orders`);
