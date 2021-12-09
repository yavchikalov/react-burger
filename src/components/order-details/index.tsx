import Modal from "../modal"
import OrderDetailsStyle from './index.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';


const OrderDetails = (props: { number: string, onClose: () => void }) => {
    return (
        <Modal onClose={props.onClose}>
            <div className={OrderDetailsStyle.root}>
                <div className={`${OrderDetailsStyle.order} text text_type_digits-large mb-8`}>
                    {props.number}
                </div>
                <div className="mb-15 text text_type_main-medium">
                    идентификатор заказа
                </div>
                <div className={`${OrderDetailsStyle.icon}`}>
                    <CheckMarkIcon type="primary" />
                </div>
                <div className="mb-2 text text_type_main-small">
                    Ваш заказ начали готовить
                </div>
                <div className="text text_type_main-default text_color_inactive mb-20">
                    Дождитесь готовности на орбитальной станции
                </div>
            </div>
        </Modal>
    )
}

export default OrderDetails;