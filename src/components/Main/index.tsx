import React from 'react';
import LayoutBase from '../layouts/base';
import MainStyle from './index.module.css';
import BurgerIngredients from '../burger-ingredients';
import BurgerConstructor from '../burger-constructor';
import IIngredientItem from '../../types/IngredientItem';


interface IIngredients {
    bun: Array<IIngredientItem>;
    sauce: Array<IIngredientItem>;
    main: Array<IIngredientItem>
}

const Main = (props: { ingredients: IIngredients }) => {

    const [selected, setSelected] = React.useState([props.ingredients.bun[0], props.ingredients.bun[0]]);

    return (
        <div className={`${MainStyle.main} pt-10 pb-10`}>
            <LayoutBase>
                <h1 className={`${MainStyle.h1} text text_type_main-large mb-5`}>Соберите бургер</h1>
                <div className={`${MainStyle.content}`}>
                    <BurgerIngredients items={props.ingredients} selected={selected} setSelected={setSelected} />
                    <BurgerConstructor items={selected} setSelected={setSelected} />
                </div>
            </LayoutBase>
        </div>
    );
};

export default Main;