import { find } from './common';
import { Ingredient } from '../models/ingridient';

export const getIngredients = () => find<Ingredient>('ingredients');
