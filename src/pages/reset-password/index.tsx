import ResetPasswordStyle from './index.module.css';
import {Input, ShowIcon, HideIcon, Button}  from '@ya.praktikum/react-developer-burger-ui-components';
import React from "react";
import LayoutBase from "../../components/layouts/base";

const ResetPassword = () => {
    const [formValues, setFormValues] = React.useState({ code: '', password: '' });
    const [isVisiblePassword, setIsVisiblePassword] = React.useState(false);
    const passwordRef = React.useRef<HTMLInputElement | null>(null);

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
        passwordRef?.current?.focus();
    }, [])

    return (
        <LayoutBase>
            <div className={ResetPasswordStyle.root}>
                <div className="text text_type_main-medium mb-6">Восстановление пароля</div>
                <form className={ResetPasswordStyle.form}>
                    <div className="mb-6">
                        <Input
                            ref={passwordRef}
                            value={formValues.password}
                            icon={isVisiblePassword ? 'HideIcon' : 'ShowIcon'}
                            name="password"
                            type={isVisiblePassword ? 'text' : 'password'}
                            placeholder="Введите новый пароль"
                            onChange={handleChange}
                            onIconClick={handleIconClick}
                        />
                    </div>
                    <div className="mb-6">
                        <Input
                            value={formValues.code}
                            name="code"
                            placeholder="Введите код из письма"
                            onChange={handleChange}
                        />
                    </div>
                    <Button type="primary" size="large">
                        Сохранить
                    </Button>
                </form>
                <div className={`${ResetPasswordStyle.text} text text_type_main-default`}>
                    Вспомнили пароль? <a href="#" className={`${ResetPasswordStyle.link}`}>Войти</a>
                </div>
            </div>
        </LayoutBase>
    );
}

export default ResetPassword;
