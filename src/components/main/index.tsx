import LayoutBase from '../layouts/base';
import MainStyle from './index.module.css';
import BurgerIngredients from '../burger-ingredients';
import BurgerConstructor from '../burger-constructor';

const Main = () => {
    return (
        <div className="pt-10 pb-10">
            <LayoutBase>
                <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
                <div className={`${MainStyle.content}`}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                </div>
            </LayoutBase>
        </div>
    );
};

export default Main;