import React from 'react';
import LayoutBase from '../layouts/base';
import MainStyle from './index.module.css';
import BurgerIngredients from '../burger-ingredients';
import BurgerConstructor from '../burger-constructor';
import IIngredients from '../../types/Ingredients';
import { SelectedIngredientsContext } from '../../contexts/mainContext';

const Main = (props: { ingredients: IIngredients }) => {

    const [selectedIngredients, setSelectedIngredients] = React.useState([props.ingredients.bun[0], props.ingredients.bun[0]]);

    return (
        <div className="pt-10 pb-10">
            <LayoutBase>
                <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
                <div className={`${MainStyle.content}`}>
                    <SelectedIngredientsContext.Provider value={{ selectedIngredients, setSelectedIngredients }}>
                        <BurgerIngredients items={props.ingredients} />
                        <BurgerConstructor />
                    </SelectedIngredientsContext.Provider>
                </div>
            </LayoutBase>
        </div>
    );
};

export default Main;