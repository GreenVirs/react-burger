import { FC } from "react";
import { Ingredient, ingredientPropType } from "../../models/ingridient";
import constructorStyles from './burger-constructor.module.css';
import { DragIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const propTypes = {
    ...ingredientPropType,
    first: PropTypes.bool,
    last: PropTypes.bool,
    className: PropTypes.string
}

type Props = Ingredient & { first?: boolean, last?: boolean, className?: string };

const ConstructorIngredient: FC<Props> = (props) => {
    return (<div className={`${constructorStyles.item__wrapper}${props.className ? ` ${props.className}` : ''}`}>
        { !props.first && !props.last && <DragIcon type={'primary'} />  }
        <ConstructorElement
            extraClass={constructorStyles.item}
            price={props.price}
            text={props.name}
            thumbnail={props.image}
            isLocked={props.first || props.last}
            type={props.first ? 'top' : props.last ? 'bottom' : undefined} />
    </div>)
}

ConstructorIngredient.defaultProps = {
    first: false,
    last: false
}

ConstructorIngredient.propTypes = propTypes;

export default ConstructorIngredient;