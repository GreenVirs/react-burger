import { useNavigate } from 'react-router';
import Modal from '../modal/modal';
import IngredientDetails from '../burger-ingredients/ingredient-details/ingredient-details';
import { routeHome } from '../app-router/app-router';

const IngredientModal = () => {
  const navigate = useNavigate();
  const onCloseModalIngredient = () => {
    navigate(routeHome);
  };
  return (
    <Modal onClose={onCloseModalIngredient} title="Детали ингредиента">
      <IngredientDetails />
    </Modal>
  );
};

export default IngredientModal;
