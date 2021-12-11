import IIngredientItem from './IngredientItem';

export default interface IIngredientList {
    bun: Array<IIngredientItem>;
    sauce: Array<IIngredientItem>;
    main: Array<IIngredientItem>
}