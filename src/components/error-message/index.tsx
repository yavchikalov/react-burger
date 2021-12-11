import ErrorMessageStyle from './index.module.css';

const ErrorMessage = (props: { text: string }) => {
    return (
        <div className={`${ErrorMessageStyle.root} text text_type_main-medium`}>{props.text}</div>
    );
}

export default ErrorMessage;