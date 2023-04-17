import AppMain from '../components/layout/app-main/app-main';
import AppLoader from '../components/app-loader/app-loader';
import BurgerSandbox from '../components/burger-sandbox/burger-sandbox';
import { useIngredientsLoading } from '../hooks/use-ingredients-loading';

const HomePage = () => {
  const isLoading = useIngredientsLoading();
  return (
    <AppMain>
      {isLoading ? <AppLoader>Загрузка ингредиентов</AppLoader> : <BurgerSandbox />}
    </AppMain>
  );
};

export default HomePage;
