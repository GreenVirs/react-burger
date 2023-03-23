import { mande } from 'mande';

const BASE_URL = 'https://norma.nomoreparties.space/api';

const createEntrypoint = (entrypoint: string) => mande(`${BASE_URL}/${entrypoint}`);

export const ingredientsApi = createEntrypoint('ingredients');

export const ordersApi = createEntrypoint('orders');
