import {
    SET_INGREDIENTS,
    SET_SELECTED_INGREDIENTS,
    SET_ERROR,
    SET_ORDER_LOADING,
    SET_ORDER,
    SET_ORDER_ERROR,
    SET_CURRENT_INGREDIENT
} from "../actions";
import IIngredientList from "../../types/IngredientList";
import IIngredientItem from "../../types/IngredientItem";

interface IInitialState {
    ingredients: IIngredientList | null;
    selectedIngredients: Array<IIngredientItem>;
    isError: boolean;
    isOrderError: boolean;
    order: {
        number: number
    } | null;
    currentIngredient: IIngredientItem | null;
    isOrderLoading: boolean;
}

const initialState: IInitialState = {
    ingredients: null,
    selectedIngredients: [],
    order: null,
    currentIngredient: null,
    isError: false,
    isOrderError: false,
    isOrderLoading: false
};

export const rootReducer = (state = initialState, action: { type: string, payload: any }) => {
    switch (action.type) {
        case SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.payload
            }
        case SET_SELECTED_INGREDIENTS:
            return {
                ...state,
                selectedIngredients: action.payload
            }
        case SET_ERROR:
            return {
                ...state,
                isError: action.payload
            }
        case SET_ORDER_LOADING:
            return {
                ...state,
                isOrderLoading: action.payload
            }
        case SET_ORDER:
            return {
                ...state,
                order: action.payload
            }
        case SET_ORDER_ERROR:
            return {
                ...state,
                isOrderError: action.payload
            }
        case SET_CURRENT_INGREDIENT:
            return {
                ...state,
                currentIngredient: action.payload
            }
        default:
            return state;
    }
}

export type RootState = ReturnType<typeof rootReducer>
