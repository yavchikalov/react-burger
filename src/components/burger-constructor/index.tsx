import React from 'react';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorStyle from './index.module.css';
import OrderDetails from '../order-details';
import IIngredientItem from '../../types/IngredientItem';
import Modal from '../modal';
import { API_ORDERS } from '../../const/api';
import ErrorMessage from '../error-message';

const BurgerConstructor = (props: { items: Array<IIngredientItem>, setSelected: (items: Array<IIngredientItem>) => void }) => {

    const bunTop = props.items.length > 1 && props.items[0].type === 'bun' ? props.items[0] : null;
    const bunBottom = props.items.length > 1 && props.items[props.items.length - 1].type === 'bun' ? props.items[props.items.length - 1] : null;
    const other = props.items.filter((item: IIngredientItem) => item.type !== 'bun');
    const [isError, setError] = React.useState(false);
    const sum = props.items.reduce((acc: number, item: IIngredientItem) => acc + item.price, 0);
    const [order, setOrder] = React.useState<string|null>(null);

    const handleRemove = (index: number) => {
        const items = [...other];
        items.splice(index, 1);
        bunTop && bunBottom && props.setSelected([bunTop, ...items, bunBottom]);
    }

    const handleOrder = () => {
        // setOrder(Math.random().toString().substring(2, 8))
        const params = JSON.stringify({ ingredients: props.items.map((item: IIngredientItem) => item._id) });
        fetch(API_ORDERS, {
            method: 'POST',
            body: params
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                return Promise.reject(new Error('Error while retrieving data'));
            })
            .then(({ data }) => {
                console.warn('API_ORDERS', data);
            })
            .catch(() => {
                setError(true);
            });
    }

    const handleCloseModalError = () => {
        setError(false);
    }

    const handleCloseModal = () => {
        setOrder(null);
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
                        {sum}
                    </div>
                    <div className={`${BurgerConstructorStyle.icon}`}>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
                <Button type="primary" size="medium" onClick={handleOrder}>
                    Оформить заказ
                </Button>
            </div>
            { 
                order &&
                (
                    <Modal onClose={handleCloseModal}>
                        <OrderDetails number={order} />
                    </Modal>
                )
            }
            {
                isError &&
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