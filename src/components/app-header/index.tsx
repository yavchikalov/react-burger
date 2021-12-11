import LayoutBase from '../layouts/base';
import AppHeaderStyle from './index.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const getIcon = (component: string, active: boolean) => {
    const type = active ? 'primary' : 'secondary';
    switch (component) {
        case 'BurgerIcon':
            return (
                <BurgerIcon type={type} />
            );
        case 'ListIcon':
            return (
                <ListIcon type={type} />
            );
    }
}

const navList = [
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
];

const AppHeader = () => {
    return (
        <header className={`${AppHeaderStyle.header} pt-4 pb-4`}>
            <LayoutBase>
                <div className={AppHeaderStyle.content}>
                    <nav className={AppHeaderStyle.nav}>
                        <ul className={AppHeaderStyle.ul}>
                            {
                                navList.map((item, index )=> (
                                    <li key={index} className={`${AppHeaderStyle.li} ${item.active && AppHeaderStyle.li_active} text text_type_main-default mr-2 pt-4 pb-4 pl-5 pr-5`}>
                                        <a href="#">
                                            <span className="pr-2">{ getIcon(item.icon, item.active) }</span>
                                            <span>{ item.title }</span>
                                        </a>
                                    </li>
                                ))
                            }
                        </ul>
                    </nav>
                    <a href="/" className={AppHeaderStyle.logo}>
                        <Logo />
                    </a>
                    <div className={`${AppHeaderStyle.loginWrapper} pt-4 pb-4 pl-5 pr-5`}>
                        <a href="#" className={AppHeaderStyle.login}>
                            <span className="mr-2">
                                <ProfileIcon type="secondary" />
                            </span>
                            <span className="text text_type_main-default">Личный кабинет</span>
                        </a>
                    </div>
                </div>
            </LayoutBase>
        </header>
    );
};

export default AppHeader;