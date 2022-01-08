import LayoutBase from "../../components/layouts/base";
import ProfileStyle from "./index.module.css";
import {Input, PasswordInput, Tab}  from '@ya.praktikum/react-developer-burger-ui-components';
import LoginStyle from "../login/index.module.css";
import React from "react";

const tabList = [
    {
        title: 'Профиль',
        value: 'profile'
    },
    {
        title: 'История заказов',
        value: 'history'
    },
    {
        title: 'Выход',
        value: 'exit'
    }
];

const Profile = () => {

    return (
        <LayoutBase>
            <div className={ProfileStyle.root}>
                <div className={`${ProfileStyle.navigation} mr-15`}>
                    {
                        tabList.map(item => (
                            <Tab key={item.value} value={ item.value } active={false} onClick={() => null}>
                                <p className={`${ProfileStyle.tabTitle} text text_type_main-medium`}>{ item.title }</p>
                            </Tab>
                        ))
                    }
                    <div className={`${ProfileStyle.description} text text_type_main-default mt-20`}>В этом разделе вы можете изменить свои персональные данные</div>
                </div>
                <div>
                    <form className={LoginStyle.form}>
                        <div className="mb-6">
                            <Input
                                value={""}
                                name="name"
                                placeholder="Имя"
                                onChange={() => null}
                            />
                        </div>
                        <div className="mb-6">
                            <Input
                                value={""}
                                name="login"
                                placeholder="Логин"
                                onChange={() => null}
                            />
                        </div>
                        <div className="mb-6">
                            <PasswordInput
                                value={""}
                                name="password"
                                onChange={() => null}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </LayoutBase>
    );
};

export default Profile;
