import React from 'react';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsStyle from './index.module.css';
import IngredientDetails from '../ingredient-details';
import IIngredientItem from '../../types/IngredientItem';
import Modal from '../modal';
import { SelectedIngredientsContext, IngredientsContext } from '../../contexts/appContext';

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
    const { selectedIngredients, setSelectedIngredients }  = React.useContext(SelectedIngredientsContext);
    const { ingredients }  = React.useContext(IngredientsContext);
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
    const [modalState, setModalState] = React.useState<{active: boolean, item: IIngredientItem | null}>({
        active: false,
        item: null
    });

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

    const handleClickItem = (item: IIngredientItem) => {
        const notBuns = selectedIngredients.filter((item: IIngredientItem) => item.type !== 'bun');
        if (item.type === 'bun') {
            return setSelectedIngredients([item, ...notBuns, item]);
        }
        const bun = selectedIngredients.find((item: IIngredientItem) => item.type === 'bun');
        return bun && setSelectedIngredients([bun, ...notBuns, item, bun]);
    }

    const handleClickImg = (e: React.MouseEvent, item: IIngredientItem) => {
        e.stopPropagation();
        setModalState({ active: true, item });
    }

    const handleCloseModal = () => {
        setModalState({ active: false, item: null });
    }

    // Не в состоянии пока понять какой тип скормить acc
    const counterList = selectedIngredients.reduce((acc: any, item: IIngredientItem) => {
        if (!acc[item._id]) acc[item._id] = 0;
        acc[item._id]++;
        return acc;
    }, {});


    const getCounter = (item: IIngredientItem) => {
        if (item.type === 'bun' && counterList[item._id]) {
            return (<Counter count={1} size="default" />)
        } else if (counterList[item._id]) {
            return (<Counter count={counterList[item._id]} size="default" />)
        }
        return null;
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
                                ingredients[category.value].map((item: IIngredientItem) =>
                                    <div key={item._id} className={`${BurgerIngredientsStyle.item} mb-2`} onClick={() => handleClickItem(item)}>
                                        <div className="pl-4 pr-4">
                                            <picture>
                                                <source media="(max-width: 480px)" srcSet={item.image_mobile} />
                                                <img src={item.image} alt={item.name} onClick={(e) => handleClickImg(e, item)} />
                                            </picture>
                                        </div>
                                        <div className={`${BurgerIngredientsStyle.price} mt-1 mb-1`}>
                                            <p className="text text_type_digits-default mr-2">{item.price}</p>
                                            <CurrencyIcon type="primary" />
                                        </div>
                                        <p className="text text_type_main-default">{item.name}</p>
                                        <div className={BurgerIngredientsStyle.counter}>
                                            { getCounter(item) }
                                        </div>
                                    </div>
                                )
                            }
                            </div>
                        </div>
                    )
                }
            </div>
            { modalState.active && modalState.item && 
                (
                    <Modal header="Детали ингредиента" onClose={handleCloseModal}>
                        <IngredientDetails {...modalState.item} />
                    </Modal>
                )
            }
        </div>
    )
}

export default BurgerIngredients;