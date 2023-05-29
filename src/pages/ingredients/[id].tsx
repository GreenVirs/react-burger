import AppMain from '../../components/layout/app-main/app-main';
import IngredientDetails from '../../components/burger-ingredients/ingredient-details/ingredient-details';
import AppLoader from '../../components/app-loader/app-loader';
import { useIngredientsLoading } from '../../hooks/use-ingredients-loading';

const IngredientPage = () => {
  const isLoading = useIngredientsLoading();

  return (
    <AppMain>
      {isLoading ? <AppLoader>Загрузка ингредиента</AppLoader> : <IngredientDetails />}
    </AppMain>
  );
};

export default IngredientPage;
