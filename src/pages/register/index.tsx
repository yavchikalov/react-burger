import RegisterStyle from './index.module.css';
import {Input, ShowIcon, HideIcon, Button}  from '@ya.praktikum/react-developer-burger-ui-components';
import React from "react";
import LayoutBase from "../../components/layouts/base";

const Register = () => {
    const [formValues, setFormValues] = React.useState({ name: '', email: '', password: '' });
    const [isVisiblePassword, setIsVisiblePassword] = React.useState(false);
    const nameRef = React.useRef<HTMLInputElement | null>(null);

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
        nameRef?.current?.focus();
    }, [])

    return (
        <LayoutBase>
            <div className={RegisterStyle.root}>
                <div className="text text_type_main-medium mb-6">Регистрация</div>
                <form className={RegisterStyle.form}>
                    <div className="mb-6">
                        <Input
                            ref={nameRef}
                            value={formValues.name}
                            name="name"
                            placeholder="Имя"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-6">
                        <Input
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
                        Зарегистрироваться
                    </Button>
                </form>
                <div className={`${RegisterStyle.text} text text_type_main-default`}>
                    Уже зарегистрированы? <a href="#" className={`${RegisterStyle.link}`}>Войти</a>
                </div>
            </div>
        </LayoutBase>
    );
}

export default Register;
