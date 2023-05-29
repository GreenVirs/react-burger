import Modal from '../modal/modal';
import IngredientDetails from '../burger-ingredients/ingredient-details/ingredient-details';
import { routeHome } from '../app-router/app-router';
import { useGoToBackgroundLocation } from '../../hooks/use-go-to-background-location';

const IngredientModal = () => {
  const onCloseModalIngredient = useGoToBackgroundLocation(routeHome);
  return (
    <Modal onClose={onCloseModalIngredient} title="Детали ингредиента">
      <IngredientDetails />
    </Modal>
  );
};

export default IngredientModal;
