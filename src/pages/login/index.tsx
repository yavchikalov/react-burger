import LoginStyle from './index.module.css';
import {Input, Button}  from '@ya.praktikum/react-developer-burger-ui-components';
import React from "react";
import LayoutBase from "../../components/layouts/base";

const Login = () => {
    const [formValues, setFormValues] = React.useState({ email: '', password: '' });
    const [isVisiblePassword, setIsVisiblePassword] = React.useState(false);
    const emailRef = React.useRef<HTMLInputElement | null>(null);

    const handleChange = (event: React.ChangeEvent) => {
        const target = event.target as HTMLInputElement;
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    const handleIconClick = () => {
        setIsVisiblePassword(!isVisiblePassword);
    }

    React.useEffect(() => {
        emailRef?.current?.focus();
    }, [])

    return (
        <LayoutBase>
            <div className={LoginStyle.root}>
                <div className="text text_type_main-medium mb-6">Вход</div>
                <form className={LoginStyle.form}>
                    <div className="mb-6">
                        <Input
                            ref={emailRef}
                            value={formValues.email}
                            name="email"
                            placeholder="Email"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-6">
                        <Input
                            value={formValues.password}
                            icon={isVisiblePassword ? 'HideIcon' : 'ShowIcon'}
                            name="password"
                            type={isVisiblePassword ? 'text' : 'password'}
                            placeholder="Пароль"
                            onChange={handleChange}
                            onIconClick={handleIconClick}
                        />
                    </div>
                    <Button type="primary" size="large">
                        Войти
                    </Button>
                </form>
                <div className={`${LoginStyle.text} text text_type_main-default mb-4`}>
                    Вы — новый пользователь? <a href="#" className={`${LoginStyle.link}`}>Зарегистрироваться</a>
                </div>
                <div className={`${LoginStyle.text} text text_type_main-default`}>
                    Забыли пароль? <a href="#" className={`${LoginStyle.link}`}>Восстановить пароль</a>
                </div>
            </div>
        </LayoutBase>
    );
}

export default Login;
