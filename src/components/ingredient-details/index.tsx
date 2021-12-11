import IngredientDetailsStyle from './index.module.css';
interface IIngredientDetails {
    calories: number;
    proteins: number;
    fat: number;
    carbohydrates: number;
    image_large: string;
    name: string;
}

const IngredientDetails = (props: IIngredientDetails) => {
    return (
        <div className={IngredientDetailsStyle.root}>
            <img src={props.image_large} alt={props.name} className="mb-4" />
            <h2 className="mb-8 text text_type_main-medium">
                {props.name}
            </h2>
            <ul className={`${IngredientDetailsStyle.content} mb-5`}>
                <li className={`${IngredientDetailsStyle.item} mr-5`}>
                    <span className="text text_type_main-default mb-2">Калории,ккал</span>
                    <span className="text text_type_digits-default">{props.calories}</span>
                </li>
                <li className={`${IngredientDetailsStyle.item} mr-5`}>
                    <span className="text text_type_main-default mb-2">Белки, г</span>
                    <span className="text text_type_digits-default">{props.proteins}</span>
                </li>
                <li className={`${IngredientDetailsStyle.item} mr-5`}>
                    <span className="text text_type_main-default mb-2">Жиры, г</span>
                    <span className="text text_type_digits-default">{props.fat}</span>
                </li>
                <li className={`${IngredientDetailsStyle.item}`}>
                    <span className="text text_type_main-default mb-2">Углеводы, г</span>
                    <span className="text text_type_digits-default">{props.carbohydrates}</span>
                </li>
            </ul>
        </div>
    )
};

export default IngredientDetails;