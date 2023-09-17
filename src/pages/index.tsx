import AppMain from '../components/layout/app-main/app-main';
import AppLoader from '../components/app-loader/app-loader';
import BurgerSandbox from '../components/burger-sandbox/burger-sandbox';
import { useRootSelector } from '../hooks/use-root-selector';
import { selectIngredients } from '../services/reducers/ingredients';

const HomePage = () => {
  const { isLoading } = useRootSelector(selectIngredients);
  return (
    <AppMain>
      {isLoading ? <AppLoader>Загрузка ингредиентов</AppLoader> : <BurgerSandbox />}
    </AppMain>
  );
};

export default HomePage;
