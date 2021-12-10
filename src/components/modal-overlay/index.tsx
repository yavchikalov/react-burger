import ModalOverlayStyle from './index.module.css';

const ModalOverlay = (props: { onClick: () => void }) => {
    const handleClose = (e: React.MouseEvent) => {
        if (e.currentTarget === e.target) props.onClick();
    }

    return (
        <div className={ModalOverlayStyle.modalOverlay} onClick={handleClose}></div>
    );
}

export default ModalOverlay;