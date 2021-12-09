import ModalOverlayStyle from './index.module.css';

const ModalOverlay = (props: { children: React.ReactNode, onClick: () => void }) => {
    const handleClose = (e: React.MouseEvent) => {
        if (e.currentTarget === e.target) props.onClick();
    }

    return (
        <div className={ModalOverlayStyle.modalOverlay} onClick={handleClose}>
            {props.children}
        </div>
    );
}

export default ModalOverlay;