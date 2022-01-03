import BurgerIngredientsItemStyle from "./item.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import IIngredientItem from "../../types/IngredientItem";
import {SET_CURRENT_INGREDIENT, SET_SELECTED_INGREDIENTS} from "../../services/actions";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../services/reducers";
import { useDrag } from "react-dnd";

const BurgerIngredient = (props: { item: IIngredientItem }) => {
    const dispatch = useDispatch();
    const selectedIngredients = useSelector((state: RootState) => state.selectedIngredients);

    const handleClickItem = () => {
        const notBuns = selectedIngredients.filter((item: IIngredientItem) => item.type !== 'bun');
        if (props.item.type === 'bun') {
            return dispatch({ type: SET_SELECTED_INGREDIENTS, payload: [props.item, ...notBuns, props.item] });
        }
        const bun = selectedIngredients.find((item: IIngredientItem) => item.type === 'bun');
        return bun && dispatch({ type: SET_SELECTED_INGREDIENTS, payload: [bun, ...notBuns, props.item, bun] });
    }
    const handleClickImg = (e: React.MouseEvent) => {
        e.stopPropagation();
        dispatch({ type: SET_CURRENT_INGREDIENT, payload: props.item });
    }

    const counterList = selectedIngredients.reduce((acc: any, item: IIngredientItem) => {
        if (!acc[item._id]) acc[item._id] = 0;
        acc[item._id]++;
        return acc;
    }, {});

    const getCounter = () => {
        if (props.item.type === 'bun' && counterList[props.item._id]) {
            return (<Counter count={1} size="default" />)
        } else if (counterList[props.item._id]) {
            return (<Counter count={counterList[props.item._id]} size="default" />)
        }
        return null;
    }

    const [, dragRef, dragPreviewRef] = useDrag({
        type: "ingredient",
        item: props.item,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    return (
        <div ref={dragRef} className={`${BurgerIngredientsItemStyle.item} mb-2`} onClick={handleClickItem} draggable>
            <div className="pl-4 pr-4">
                <picture>
                    <source media="(max-width: 480px)" srcSet={props.item.image_mobile} />
                    <img ref={dragPreviewRef} src={props.item.image} alt={props.item.name} onClick={handleClickImg} />
                </picture>
            </div>
            <div className={`${BurgerIngredientsItemStyle.price} mt-1 mb-1`}>
                <p className="text text_type_digits-default mr-2">{props.item.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className="text text_type_main-default">{props.item.name}</p>
            <div className={BurgerIngredientsItemStyle.counter}>
                { getCounter() }
            </div>
        </div>
    )
};

export default BurgerIngredient;
