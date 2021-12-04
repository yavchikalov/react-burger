import React from 'react';
import LayoutBase from '../layouts/Base/';
import MainStyle from './index.module.css';
import BurgerIngredients from '../BurgerIngredients/';
import BurgerConstructor from '../BurgerConstructor/';
import { data } from '../../utils/data';

const Main = () => {
    const ingredients = data.reduce((acc: any, item: any) => {
        if (!acc[item.type]) acc[item.type] = [];
        acc[item.type].push(item);
        return acc;
    }, {});

    const [selected, setSelected] = React.useState([ingredients.bun[0], ingredients.bun[0]]);

    return (
        <div className={`${MainStyle.main} pt-10 pb-10`}>
            <LayoutBase>
                <h1 className={`${MainStyle.h1} text text_type_main-large mb-5`}>Соберите бургер</h1>
                <div className={`${MainStyle.content}`}>
                    <BurgerIngredients items={ingredients} selected={selected} setSelected={setSelected} />
                    <BurgerConstructor items={selected} setSelected={setSelected} />
                </div>
            </LayoutBase>
        </div>
    );
};

export default Main;