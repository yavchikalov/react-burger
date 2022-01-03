import ForgotPasswordStyle from './index.module.css';
import {Input, Button}  from '@ya.praktikum/react-developer-burger-ui-components';
import React from "react";
import LayoutBase from "../../components/layouts/base";

const ForgotPassword = () => {
    const [email, setEmail] = React.useState('');
    const emailRef = React.useRef<HTMLInputElement | null>(null);

    const handleChange = (event: React.ChangeEvent) => {
        const target = event.target as HTMLInputElement;
        setEmail(target.value);
    }

    React.useEffect(() => {
        emailRef?.current?.focus();
    }, [])

    return (
        <LayoutBase>
            <div className={ForgotPasswordStyle.root}>
                <div className="text text_type_main-medium mb-6">Восстановление пароля</div>
                <form className={ForgotPasswordStyle.form}>
                    <div className="mb-6">
                        <Input
                            ref={emailRef}
                            value={email}
                            name="email"
                            placeholder="Укажите e-mail"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-6">
                        <Button type="primary" size="large">
                            Восстановить
                        </Button>
                    </div>
                </form>
                <div className={`${ForgotPasswordStyle.text} text text_type_main-default`}>
                    Вспомнили пароль? <a href="#" className={`${ForgotPasswordStyle.link}`}>Войти</a>
                </div>
            </div>
        </LayoutBase>
    );
}

export default ForgotPassword;
