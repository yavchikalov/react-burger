import React from 'react';
import BaseHeader from '../app-header';
import Main from '../main';
import ErrorMessage from '../error-message';
import {useDispatch, useSelector} from "react-redux";
import {GET_INGREDIENTS} from "../../services/actions";
import {RootState} from "../../services/reducers";

function App() {
    const dispatch = useDispatch();
    const {ingredients, isError} = useSelector((state: RootState) => ({ingredients: state.ingredients, isError: state.isError}));

    React.useEffect(() => {
        dispatch(GET_INGREDIENTS());
    }, [dispatch]);

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
            {CurrentContent}
        </>
    );
}

export default App;
