import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorItemStyle from "./item.module.css";
import React from "react";
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import IIngredientItem from "../../types/IngredientItem";
import { XYCoord } from 'dnd-core';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../services/reducers";
import {SET_SELECTED_INGREDIENTS} from "../../services/actions";

interface IItem {
    item: IIngredientItem;
    index: number;
    type?: 'top' | 'bottom';
    isLocked?: boolean;
    handleClose?: () => void;
    text: string;
    thumbnail: string;
    price: number;
}

const BurgerConstructorItem = (props: IItem) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const selectedIngredients = useSelector((state: RootState) => state.selectedIngredients);
    const dispatch = useDispatch();

    const moveItem = React.useCallback((dragIndex, hoverIndex) => {
        const ingredientsWithoutBuns = selectedIngredients.filter((item: IIngredientItem) => item.type !== 'bun');
        const bun = selectedIngredients.find((item: IIngredientItem) => item.type === 'bun');
        const dragItem = ingredientsWithoutBuns[dragIndex];
        const items = [...ingredientsWithoutBuns];
        items.splice(dragIndex, 1);
        items.splice(hoverIndex, 0, dragItem);

        dispatch({ type: SET_SELECTED_INGREDIENTS, payload: [bun, ...items, bun] });
    }, [selectedIngredients, dispatch])

    const [{handlerId}, drop] = useDrop({
        accept: 'item',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item: { item: IIngredientItem, index: number }, monitor: DropTargetMonitor) {
            if (!ref.current || !props.item || props.index === undefined || item.index === props.index) {
                return
            }
            const dragIndex = item.index;
            const hoverIndex = props.index;
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

            if ((dragIndex < hoverIndex && hoverClientY < hoverMiddleY) || (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)) {
                return;
            }

            moveItem(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    })

    const [, drag] = useDrag({
        type: 'item',
        item: () => ({item: props.item, index: props.index})
    });

    drag(drop(ref));

    return (
        <div ref={ref} className={`${BurgerConstructorItemStyle.item} mr-2`} data-handler-id={handlerId}>
            <div className={`${BurgerConstructorItemStyle.drag} mr-4`}>
                <DragIcon type="primary" />
            </div>
            <ConstructorElement
                type={props.type}
                text={props.text}
                isLocked={props.isLocked}
                price={props.price}
                thumbnail={props.thumbnail}
                handleClose={props.handleClose}
            />
        </div>
    )
}

export default BurgerConstructorItem;
