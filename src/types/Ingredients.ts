import IIngredientItem from './IngredientItem';

export default interface IIngredients {
    [T: string] : Array<IIngredientItem>;
}
