import Modal from '../Modal';
import IngredientDetailsStyle from './index.module.css';

const IngredientDetails = (props: any) => {
    return (
        <Modal header="Детали ингредиента" onClose={props.onClose}>
            <div className={IngredientDetailsStyle.root}>
                <div className="mb-4">
                    <img src={props.image_large} alt={props.name} />
                </div>
                <div className="mb-8 text text_type_main-medium">
                    {props.name}
                </div>
                <div className={`${IngredientDetailsStyle.content} mb-5`}>
                    <div className={`${IngredientDetailsStyle.item} mr-5`}>
                        <div className="text text_type_main-default mb-2">Калории,ккал</div>
                        <div className="text text_type_digits-default">{props.calories}</div>
                    </div>
                    <div className={`${IngredientDetailsStyle.item} mr-5`}>
                        <div className="text text_type_main-default mb-2">Белки, г</div>
                        <div className="text text_type_digits-default">{props.proteins}</div>
                    </div>
                    <div className={`${IngredientDetailsStyle.item} mr-5`}>
                        <div className="text text_type_main-default mb-2">Жиры, г</div>
                        <div className="text text_type_digits-default">{props.fat}</div>
                    </div>
                    <div className={`${IngredientDetailsStyle.item}`}>
                        <div className="text text_type_main-default mb-2">Углеводы, г</div>
                        <div className="text text_type_digits-default">{props.carbohydrates}</div>
                    </div>
                </div>
            </div>
        </Modal>
    )
};

export default IngredientDetails;