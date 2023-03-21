export const INGREDIENT_TYPE = ['bun', 'main', 'sauce'] as const;

export type IngredientTypes = (typeof INGREDIENT_TYPE)[number];

export type Ingredient = {
  _id: string;
  image: string;
  name: string;
  type: IngredientTypes;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image_mobile: string;
  image_large: string;
  __v: number;
};
