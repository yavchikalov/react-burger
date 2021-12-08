import React from 'react';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorStyle from './index.module.css';
import OrderDetails from '../OrderDetails';

const BurgerConstructor = (props: any) => {

    const bunTop = props.items.length > 1 && props.items[0].type === 'bun' ? props.items[0] : null;
    const bunBottom = props.items.length > 1 && props.items[props.items.length - 1].type === 'bun' ? props.items[props.items.length - 1] : null;
    const other = props.items.filter((item: any) => item.type !== 'bun');

    const handleClose = (index: any) => {
        const items = [...other];
        items.splice(index, 1);
        props.setSelected([bunTop, ...items, bunBottom]);
    }

    const sum = props.items.reduce((acc: any, item: any) => acc + item.price, 0);

    const [order, setOrder] = React.useState<string|null>(null);

    const handleOrder = () => {
        setOrder(Math.random().toString().substring(2, 8))
    }

    const handleCloseModal = () => {
        setOrder(null);
    }

    return (
        <div className={BurgerConstructorStyle.root}>
            {
                bunTop && <div className={`${BurgerConstructorStyle.item} mr-2`}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={bunTop.name}
                        price={bunTop.price}
                        thumbnail={bunTop.image}
                    />
                </div>
            }
            {
                !!other.length && <div className={BurgerConstructorStyle.main}>
                    {
                        other.map((item: any, index: any) =>
                            <div key={`${index}_${item._id}`} className={`${BurgerConstructorStyle.item} mr-2`}>
                                <div className={`${BurgerConstructorStyle.drag} mr-4`}>
                                    <DragIcon type="primary" />
                                </div>
                                <ConstructorElement
                                    text={item.name}
                                    price={item.price}
                                    thumbnail={item.image}
                                    handleClose={() => handleClose(index)}
                                />
                            </div>
                        )
                    }
                </div>
            }
            {
                bunBottom && <div className={`${BurgerConstructorStyle.item} mr-2`}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={bunBottom.name}
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
            { order && <OrderDetails number={order} onClose={handleCloseModal} />}
        </div>
    );
}

export default BurgerConstructor;