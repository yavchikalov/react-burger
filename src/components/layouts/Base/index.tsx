import BaseStyle from './index.module.css';

const LayoutBase = (props: { children: React.ReactNode }) => {
    return (
        <main className={`${BaseStyle.main} pr-4 pl-4`}>
            { props.children }
        </main>
    );
}

export default LayoutBase;