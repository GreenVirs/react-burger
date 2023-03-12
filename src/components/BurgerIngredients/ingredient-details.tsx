import ModalOverlay from "../Modal/modal-overlay";
import Modal from "../Modal/modal";
import IngredientAttributeList from "./ingredient-attribute-list";
import { FC } from "react";
import { Ingredient, ingredientPropType } from "../../models/ingridient";
import PropTypes from "prop-types";
import ingredientStyle from './burger-ingredients.module.css';


const propTypes = {
    ingredient: ingredientPropType,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
}

type Props = {
    ingredient: Ingredient
    isOpen: boolean
    onClose: () => void,
}
const IngredientDetails: FC<Props> = (props) => {
    return (<>
            <ModalOverlay isOpen={props.isOpen} onClose={props.onClose} />
            <Modal isOpen={props.isOpen} onClose={props.onClose} title={'Детали ингредиента'}>
                <div className={'pr-5 pl-5'}>
                    <img src={props.ingredient.image_large} alt={props.ingredient.name}/>
                </div>
                <span className={`mt-4 text text_type_main-medium ${ingredientStyle['ingredient-modal__name']}`}>{props.ingredient.name}</span>
                <IngredientAttributeList extraClass={'mt-8'} ingredient={props.ingredient} />
            </Modal>
        </>
    );
}

IngredientDetails.propTypes = propTypes;

export default IngredientDetails;