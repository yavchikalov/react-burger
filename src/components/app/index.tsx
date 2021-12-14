import React from 'react';
import BaseHeader from '../app-header';
import Main from '../main';
import ErrorMessage from '../error-message';
import IIngredientItem from '../../types/IngredientItem';
import { API_INGREDIENTS } from '../../const/api';
import { SelectedIngredientsContext, IngredientsContext } from '../../contexts/appContext';

function App() {
    const [ingredients, setIngredients] = React.useState();
    const [isError, setError] = React.useState(false);
    const [selectedIngredients, setSelectedIngredients] = React.useState<IIngredientItem[]>([]);

    React.useEffect(() => {
        fetch(API_INGREDIENTS)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                return Promise.reject(new Error('Error while retrieving data'));
            })
            .then(({ data }) => {
                if (data) {
                    const ingredients = data.reduce((acc: any, item: IIngredientItem) => {
                        if (!acc[item.type]) acc[item.type] = [];
                        acc[item.type].push(item);
                        return acc;
                    }, {});
                    setIngredients(ingredients);
                    setSelectedIngredients([ingredients.bun[0], ingredients.bun[0]]);
                }
            })
            .catch(() => {
                setError(true);
            });
    }, []);

    const CurrentContent = React.useMemo(() => {
        if (!isError && ingredients) {
            return (
                <Main />
            );
        } else if (isError) {
            return (
                <div className="m-10">
                    <ErrorMessage text="Ошибка при получении данных, попробуйте позднее." />
                </div>
            );
        }
        return (<></>);
    }, [ingredients, isError]);

    return (
        <>
            <BaseHeader />
            <IngredientsContext.Provider value={{ ingredients, setIngredients }}>
                <SelectedIngredientsContext.Provider value={{ selectedIngredients, setSelectedIngredients }}>
                    {CurrentContent}
                </SelectedIngredientsContext.Provider>
            </IngredientsContext.Provider>
        </>
    );
}

export default App;
