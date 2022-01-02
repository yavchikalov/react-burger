import React from 'react';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsStyle from './index.module.css';
import IngredientDetails from '../ingredient-details';
import IIngredientItem from '../../types/IngredientItem';
import Modal from '../modal';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../services/reducers";
import {SET_SELECTED_INGREDIENTS, SET_CURRENT_INGREDIENT} from "../../services/actions";
import BurgerIngredient from "../burger-ingredient";

interface ITabs {
    title: string;
    value: string;
    point: number | null;
}

const tabList = [
    {
        title: 'Булки',
        value: 'bun',
        point: null
    },
    {
        title: 'Соусы',
        value: 'sauce',
        point: null
    },
    {
        title: 'Начинки',
        value: 'main',
        point: null
    }
];

const BurgerIngredients = () => {
    const { ingredients, selectedIngredients, currentIngredient } = useSelector((state: RootState) => ({
        ingredients: state.ingredients,
        selectedIngredients: state.selectedIngredients,
        currentIngredient: state.currentIngredient
    }));
    const dispatch = useDispatch();
    const [tabs, setTabs] = React.useState<Array<ITabs>>(tabList);
    const [currentScrollTop, setCurrentScrollTop] = React.useState(0);

    React.useEffect(() => {
        const handleScrollTab = (event: Event) => {
            const element = event.currentTarget as HTMLElement;
            setCurrentScrollTop(element.scrollTop);
        };
        const list = tabList.reduce((acc: { tabs: any, point: number }, item) => {
            const element = document.getElementById(item.value);
            if (element) {
                const point = acc.point + element.scrollHeight;
                acc.tabs.push({
                    ...item,
                    point
                });
                acc.point = point;
            }
            return acc;
        }, { tabs: [], point: 0 });

        setTabs(list.tabs);

        document.getElementById('content')?.addEventListener('scroll', handleScrollTab);

        return () => document.getElementById('content')?.removeEventListener('scroll', handleScrollTab);
    }, [])

    const [current, setCurrent] = React.useState('bun');

    React.useEffect(() => {
        const tab = tabs.find(item => {
            if (item.point && currentScrollTop <= item.point) return item;
            return null;
        });

        if (tab && tab.value !== current) setCurrent(tab.value);
    }, [currentScrollTop, tabs, current]);

    const handleChangeTab = (value: string) => {
        setCurrent(value);
        const el = document.getElementById(value);
        el && el.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }

    const handleCloseModal = () => {
        dispatch({ type: SET_CURRENT_INGREDIENT, payload: null });
    }

    return (
        <div className={BurgerIngredientsStyle.root}>
            <div className={`${BurgerIngredientsStyle.tabs} mb-10`}>
                {
                    tabs.map(item => (
                        <Tab key={item.value} value={ item.value } active={ current === item.value } onClick={ handleChangeTab }>
                            { item.title }
                        </Tab>
                    ))
                }
            </div>
            <div id="content" className={BurgerIngredientsStyle.content}>
                {
                    tabs.map(category =>
                        <div id={category.value} key={category.value}>
                            <p className={`${BurgerIngredientsStyle.title} text text_type_main-medium mb-6`}>
                                { category.title }
                            </p>
                            <div className={`${BurgerIngredientsStyle.items} pr-4 pl-4 mb-8`}>
                            {
                                ingredients && ingredients[category.value].map((item: IIngredientItem) =>
                                    <BurgerIngredient
                                        key={item._id}
                                        item={item}
                                    />
                                )
                            }
                            </div>
                        </div>
                    )
                }
            </div>
            { currentIngredient &&
                (
                    <Modal header="Детали ингредиента" onClose={handleCloseModal}>
                        <IngredientDetails {...currentIngredient} />
                    </Modal>
                )
            }
        </div>
    )
}

export default BurgerIngredients;
