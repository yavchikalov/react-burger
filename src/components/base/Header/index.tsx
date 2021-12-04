import React from 'react';
import LayoutBase from '../../layouts/Base/';
import HeaderStyle from './index.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const BaseHeader = () => {
    const getIcon = (component: string, active: boolean) => {
        const type = active ? 'primary' : 'secondary';
        switch (component) {
            case 'BurgerIcon':
                return <BurgerIcon type={type} />
            case 'ListIcon':
                return <ListIcon type={type} />
        }
    }
    const [navList] = React.useState([
        {
            title: 'Конструктор',
            active: true,
            icon: 'BurgerIcon'
        },
        {
            title: 'Лента заказов',
            active: false,
            icon: 'ListIcon'
        }
    ]);

    return (
        <header className={`${HeaderStyle.header} pt-4 pb-4`}>
            <LayoutBase>
                <div className={HeaderStyle.content}>
                    <nav className={HeaderStyle.nav}>
                        <ul className={HeaderStyle.ul}>
                            {
                                navList.map((item, index )=> (
                                    <li key={index} className={`${HeaderStyle.li} ${item.active && HeaderStyle.li_active} text text_type_main-default mr-2 pt-4 pb-4 pl-5 pr-5`}>
                                        <span className="pr-2">{ getIcon(item.icon, item.active) }</span>
                                        <span>{ item.title }</span>
                                    </li>
                                ))
                            }
                        </ul>
                    </nav>
                    <div className={HeaderStyle.logo}>
                        <Logo />
                    </div>
                    <div className={`${HeaderStyle.login} pt-4 pb-4 pl-5 pr-5`}>
                        <span className="mr-2">
                            <ProfileIcon type="primary" />
                        </span>
                        <span className="text text_type_main-default">Личный кабинет</span>
                    </div>
                </div>
            </LayoutBase>
        </header>
    );
};


export default BaseHeader;