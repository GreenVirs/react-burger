import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { IngredientsState } from '../services/reducers/ingredients';

export const useIngredientsLoading = () => {
  const {
    ingredients: { isLoading },
  } = useSelector<RootState, { ingredients: IngredientsState }>((state) => ({
    ingredients: state.ingredients,
  }));

  return isLoading;
};
