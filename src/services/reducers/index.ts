import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { constructorReducer } from './constructor';
// import { currentIngredientReducer } from './current-ingredient';
// import { orderReducer } from './order';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  builder: constructorReducer,
  // currentIngredient: currentIngredientReducer,
  // order: orderReducer,
});
