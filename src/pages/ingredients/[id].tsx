import AppMain from '../../components/layout/app-main/app-main';
import IngredientDetails from '../../components/burger-ingredients/ingredient-details/ingredient-details';
import AppLoader from '../../components/app-loader/app-loader';
import { useRootSelector } from '../../hooks/use-root-selector';
import { selectIngredients } from '../../services/reducers/ingredients';
import AppCenterContainer from '../../components/layout/app-center-container/app-center-container';

const IngredientPage = () => {
  const { isLoading } = useRootSelector(selectIngredients);

  return (
    <AppMain>
      <AppCenterContainer>
        {isLoading ? <AppLoader>Загрузка ингредиента</AppLoader> : <IngredientDetails />}
      </AppCenterContainer>
    </AppMain>
  );
};

export default IngredientPage;
