import React from 'react';
import BaseHeader from '../app-header';
import Main from '../main';
import IIngredientItem from '../../types/IngredientItem';

function App() {
    const [ingredients, setIngredients] = React.useState();

    React.useEffect(() => {
        fetch('https://norma.nomoreparties.space/api/ingredients')
            .then((response) => {
                return response.json();
            })
            .then(({ data }) => {
                if (data) {
                    setIngredients(
                        // Не в состоянии пока понять какой тип скормить acc
                        data.reduce((acc: any, item: IIngredientItem) => {
                            if (!acc[item.type]) acc[item.type] = [];
                            acc[item.type].push(item);
                            return acc;
                        }, {})
                    )
                }
            });
    }, []);

    return (
        <div className="App">
            <BaseHeader />
            {
                ingredients && (<Main ingredients={ingredients} />)
            }
        </div>
    );
}

export default App;
