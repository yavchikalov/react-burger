import React from 'react';
import BaseHeader from '../app-header';
import Main from '../main';
import ErrorMessage from '../error-message';
import IIngredientItem from '../../types/IngredientItem';
import { API_INGREDIENTS } from '../../const/api';

function App() {
    const [ingredients, setIngredients] = React.useState();
    const [isError, setError] = React.useState(false);

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
                    setIngredients(
                        // Не в состоянии пока понять какой тип скормить acc
                        data.reduce((acc: any, item: IIngredientItem) => {
                            if (!acc[item.type]) acc[item.type] = [];
                            acc[item.type].push(item);
                            return acc;
                        }, {})
                    )
                }
            })
            .catch(() => {
                setError(true);
            });
    }, []);

    const CurrentContent = () => {
        if (!isError && ingredients) {
            return (
                <Main ingredients={ingredients} />
            );
        } else if (isError) {
            return (
                <div className="m-10">
                    <ErrorMessage text="Ошибка при получении данных, попробуйте позднее." />
                </div>
            );
        }
        return (<></>);
    };

    return (
        <>
            <BaseHeader />
            <CurrentContent />
        </>
    );
}

export default App;
