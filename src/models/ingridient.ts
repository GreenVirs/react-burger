import PropTypes from "prop-types";
const ingredientType = ['bun', 'main', 'sauce'] as const;
export const ingredientPropType = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(ingredientType).isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired
}).isRequired

export type Ingredient = {
    _id: string
    image: string
    name: string
    type: typeof ingredientType[number]
    proteins: number
    fat: number
    carbohydrates: number
    calories: number
    price: number
    image_mobile: string
    image_large: string
    __v: number
}