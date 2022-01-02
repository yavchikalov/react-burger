import React from 'react';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorStyle from './index.module.css';
import OrderDetails from '../order-details';
import IIngredientItem from '../../types/IngredientItem';
import Modal from '../modal';
import ErrorMessage from '../error-message';
import {CREATE_ORDER, SET_ORDER, SET_SELECTED_INGREDIENTS, SET_ORDER_ERROR} from "../../services/actions";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../services/reducers";

function totalReducer(state: number, action: { type: string, payload: number }): number {
    switch (action.type) {
        case 'increase':
            return state + action.payload;
        case 'decrease':
            return state - action.payload;
        case 'set':
            return action.payload;
        default:
            throw new Error(`Wrong type of action: ${action.type}`);
    }
}

const BurgerConstructor = () => {
    const { selectedIngredients, isOrderLoading, isOrderError, order } = useSelector((state: RootState) => ({
        selectedIngredients: state.selectedIngredients,
        isOrderLoading: state.isOrderLoading,
        isOrderError: state.isOrderError,
        order: state.order,
    }));
    const dispatch = useDispatch();
    const [totalState, totalDispatch] = React.useReducer(totalReducer, 0);
    const bunTop = selectedIngredients.length > 1 && selectedIngredients[0].type === 'bun' ? selectedIngredients[0] : null;
    const bunBottom = selectedIngredients.length > 1 && selectedIngredients[selectedIngredients.length - 1].type === 'bun' ? selectedIngredients[selectedIngredients.length - 1] : null;
    const other = selectedIngredients.filter((item: IIngredientItem) => item.type !== 'bun');

    React.useEffect(() => {
        selectedIngredients.forEach((ingredient: IIngredientItem) => {
            totalDispatch({ type: 'increase', payload: ingredient.price });
        });
        return totalDispatch.bind(null, { type: 'set', payload: 0 });
    }, [selectedIngredients])

    const handleRemove = (index: number) => {
        const items = [...other];
        items.splice(index, 1);
        bunTop && bunBottom && dispatch({ type: SET_SELECTED_INGREDIENTS, payload: [bunTop, ...items, bunBottom] });
    }

    const handleOrder = () => {
        if (!isOrderLoading) {
            const ingredients = JSON.stringify({ ingredients: selectedIngredients.map((item: IIngredientItem) => item._id) });
            dispatch(CREATE_ORDER(ingredients));
        }
    }

    const handleCloseModalError = () => {
        dispatch({ type: SET_ORDER_ERROR, payload: false });
    }

    const handleCloseModal = () => {
        dispatch({ type: SET_ORDER, payload: null });
    }

    return (
        <div className={BurgerConstructorStyle.root}>
            {
                bunTop && (<div className={`${BurgerConstructorStyle.item} mr-2`}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${bunTop.name} (Верх)`}
                        price={bunTop.price}
                        thumbnail={bunTop.image}
                    />
                </div>)
            }
            {
                !!other.length && <div className={BurgerConstructorStyle.main}>
                    {
                        other.map((item: IIngredientItem, index: number) => (
                            <div key={`${index}_${item._id}`} className={`${BurgerConstructorStyle.item} mr-2`}>
                                <div className={`${BurgerConstructorStyle.drag} mr-4`}>
                                    <DragIcon type="primary" />
                                </div>
                                <ConstructorElement
                                    text={item.name}
                                    price={item.price}
                                    thumbnail={item.image}
                                    handleClose={() => handleRemove(index)}
                                />
                            </div>
                        ))
                    }
                </div>
            }
            {
                bunBottom && <div className={`${BurgerConstructorStyle.item} mr-2`}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${bunBottom.name} (низ)`}
                        price={bunBottom.price}
                        thumbnail={bunBottom.image}
                    />
                </div>
            }
            <div className={`${BurgerConstructorStyle.bottom} mt-10`}>
                <div className={`${BurgerConstructorStyle.sum} mr-10`}>
                    <div className={`${BurgerConstructorStyle.value} text text_type_digits-medium mr-2`}>
                        {totalState}
                    </div>
                    <div className={`${BurgerConstructorStyle.icon}`}>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
                <Button type="primary" size="medium" onClick={handleOrder}>
                    { isOrderLoading ? 'Оформляем...' : 'Оформить заказ' }
                </Button>
            </div>
            {
                order &&
                (
                    <Modal onClose={handleCloseModal}>
                        <OrderDetails number={order.number} />
                    </Modal>
                )
            }
            {
                isOrderError &&
                (
                    <Modal onClose={handleCloseModalError}>
                        <div className="p-4">
                            <ErrorMessage text="Ошибка при оформлении заказа, попробуйте еще раз!" />
                        </div>
                    </Modal>
                )
            }
        </div>
    );
}

export default BurgerConstructor;
