import {mande} from "mande";
const BASE_URL = 'https://norma.nomoreparties.space/api';

export const ingredientsApi = mande(BASE_URL + '/ingredients ');