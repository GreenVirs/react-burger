import {FC, useMemo} from "react";
import { Ingredient } from "../../models/ingridient";
import constructorStyles from './burger-constructor.module.css';
import { DragIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";

type Props = Ingredient & {
    first?: boolean,
    last?: boolean,
    className?: string
};

const ConstructorIngredient: FC<Props> = (props) => {
    const name = useMemo(() => {
        return `${props.name}${props.first ? ' (верх)': ''}${props.last ? ' (низ)': ''}`
    }, [props.name, props.first, props.last])

    return (<div className={`${constructorStyles.item__wrapper}${props.className ? ` ${props.className}` : ''}`}>
        { !props.first && !props.last && <DragIcon type={'primary'} />  }
        <ConstructorElement
            extraClass={constructorStyles.item}
            price={props.price}
            text={name}
            thumbnail={props.image}
            isLocked={props.first || props.last}
            type={props.first ? 'top' : props.last ? 'bottom' : undefined} />
    </div>)
}

ConstructorIngredient.defaultProps = {
    first: false,
    last: false
}

export default ConstructorIngredient;