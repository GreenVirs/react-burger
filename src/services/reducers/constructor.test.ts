import {
  constructorReducer,
  ADD_ITEM,
  REMOVE_ITEM,
  // SORT_ITEMS,
  CLEAR_ITEMS,
  initialState,
  SORT_ITEMS,
} from './constructor';
import { Ingredient } from '../../models/ingridient';

const mockID = '123456789';
jest.mock('uuid', () => ({ v4: () => mockID }));

const bunIngredient: Ingredient = {
  calories: 420,
  carbohydrates: 53,
  fat: 24,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  name: 'Краторная булка N-200i',
  price: 1255,
  proteins: 80,
  type: 'bun',
  __v: 0,
  _id: '643d69a5c3f7b9001cfa093c',
};

const mainIngredient: Ingredient = {
  _id: '643d69a5c3f7b9001cfa093e',
  name: 'Филе Люминесцентного тетраодонтимформа',
  type: 'main',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/meat-03.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
  __v: 0,
};

const sauceIngredient: Ingredient = {
  _id: '643d69a5c3f7b9001cfa0945',
  name: 'Соус с шипами Антарианского плоскоходца',
  type: 'sauce',
  proteins: 101,
  fat: 99,
  carbohydrates: 100,
  calories: 100,
  price: 88,
  image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png',
  __v: 0,
};

test('should return the initial state', () => {
  expect(constructorReducer(undefined, { type: undefined })).toEqual(initialState);
});

test('Должен добавить ингредиент булки', () => {
  expect(constructorReducer(initialState, ADD_ITEM({ ingredient: bunIngredient }))).toEqual({
    bun: bunIngredient,
    ingredients: [],
  });
});

test('Должен добавить ингредиент начинки', () => {
  expect(constructorReducer(initialState, ADD_ITEM({ ingredient: mainIngredient }))).toEqual({
    bun: null,
    ingredients: [{ id: '123456789', ingredient: mainIngredient }],
  });
});

test('Должен удалить ингредиент булки', () => {
  expect(
    constructorReducer(
      {
        bun: bunIngredient,
        ingredients: [],
      },
      REMOVE_ITEM({ ingredient: bunIngredient, id: mockID })
    )
  ).toEqual(initialState);
});

test('Должен удалить ингредиент начинки', () => {
  expect(
    constructorReducer(
      {
        bun: null,
        ingredients: [{ id: mockID, ingredient: mainIngredient }],
      },
      REMOVE_ITEM({ ingredient: mainIngredient, id: mockID })
    )
  ).toEqual(initialState);
});

test('Должен сортировать ингредиенты начинки', () => {
  expect(
    constructorReducer(
      {
        bun: null,
        ingredients: [
          { id: mockID, ingredient: mainIngredient },
          { id: mockID, ingredient: sauceIngredient },
        ],
      },
      SORT_ITEMS({ from: 0, to: 1 })
    )
  ).toEqual({
    bun: null,
    ingredients: [
      { id: mockID, ingredient: sauceIngredient },
      { id: mockID, ingredient: mainIngredient },
    ],
  });
});

test('Должен очистить конструктор', () => {
  expect(
    constructorReducer(
      {
        bun: bunIngredient,
        ingredients: [{ id: mockID, ingredient: mainIngredient }],
      },
      CLEAR_ITEMS()
    )
  ).toEqual(initialState);
});
