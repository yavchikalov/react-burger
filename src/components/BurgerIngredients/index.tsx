import React from 'react';
import PropTypes from 'prop-types';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsStyle from './index.module.css';
import IngredientDetails from '../IngredientDetails';

const BurgerIngredients = (props: any) => {
    const [tabs] = React.useState([
        {
            title: 'Булки',
            value: 'bun'
        },
        {
            title: 'Соусы',
            value: 'sauce'
        },
        {
            title: 'Начинки',
            value: 'main'
        }
    ]);

    const [current, setCurrent] = React.useState('bun');
    const [modalState, setModalState] = React.useState<any>({
        active: false,
        item: null
    });

    const handleChangeTab = (value: string) => {
        setCurrent(value);
        const el = document.getElementById(value);
        el && el.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }

    const handleClickItem = (item: any) => {
        const notBuns = props.selected.filter((item: any) => item.type !== 'bun');
        if (item.type === 'bun') {
            return props.setSelected([item, ...notBuns, item]);
        }
        const bun = props.selected.find((item: any) => item.type === 'bun');
        return props.setSelected([bun, ...notBuns, item, bun]);
    }

    const handleClickImg = (e: any, item: any) => {
        e.stopPropagation();
        setModalState({ active: true, item });
    }

    const handleCloseModal = () => {
        setModalState({ active: false, item: null });
    }

    const counterList = props.selected.reduce((acc: any, item: any) => {
        if (!acc[item._id]) acc[item._id] = 0;
        acc[item._id]++;
        return acc;
    }, {});


    const getCounter = (item: any) => {
        if (item.type === 'bun' && counterList[item._id]) {
            return <Counter count={1} size="default" />
        } else if (counterList[item._id]) {
            return <Counter count={counterList[item._id]} size="default" />
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
                        <React.Fragment key={category.value}>
                            <p id={category.value} className={`${BurgerIngredientsStyle.title} text text_type_main-medium mb-6`}>
                                { category.title }
                            </p>
                            <div className={`${BurgerIngredientsStyle.items} pr-4 pl-4 mb-8`}>
                            {
                                props.items[category.value].map((item: any) =>
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
                        </React.Fragment>
                    )
                }
            </div>
            { modalState.active && modalState.item && <IngredientDetails {...modalState.item} onClose={handleCloseModal} /> }
        </div>
    )
}

BurgerIngredients.propTypes = {
    items: PropTypes.shape({
        bun: PropTypes.array.isRequired,
        sauce: PropTypes.array.isRequired,
        main: PropTypes.array.isRequired
    }).isRequired,
    selected: PropTypes.array.isRequired,
    setSelected:PropTypes.func.isRequired
}

export default BurgerIngredients;