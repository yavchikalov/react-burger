import React from 'react';
import ReactDOM from 'react-dom';
import ModalStyle from './index.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay';
import { CSSTransition } from 'react-transition-group';
import './animation.css';

const modalRoot: HTMLElement | null = document.getElementById("react-modals");

const Modal = (props: { header?: string, children: React.ReactNode, onClose: () => void }) => {

    const [inAnimation, setAnimation] = React.useState(false);

    React.useEffect(() => {
        const handleKeyDownEsc = (e: KeyboardEvent) => {
            if (e.code === 'Escape') props.onClose();
        }
        document.addEventListener('keydown', handleKeyDownEsc);
        return () => document.removeEventListener('keydown', handleKeyDownEsc);
    }, [props])

    React.useEffect(() => {
        setAnimation(true);
    }, []);

    const handleClose = () => {
        setAnimation(false);
    };

    return modalRoot && ReactDOM.createPortal(
        <ModalOverlay onClick={handleClose}>
            <div className={`${ModalStyle.root}`}>
                <CSSTransition
                    mountOnEnter
                    unmountOnExit
                    in={inAnimation}
                    timeout={50}
                    classNames="animation-scale"
                    onExited={props.onClose}
                >
                    <div className={`${ModalStyle.content} p-10`}>
                        <div className={`${ModalStyle.header}`}>
                            <div className={`${ModalStyle.title} text text_type_main-large`}>
                                {props.header}
                            </div>
                            <div className={`${ModalStyle.icon}`}>
                                <CloseIcon type="primary" onClick={handleClose} />
                            </div>
                        </div>
                        {props.children}
                    </div>
                </CSSTransition>
            </div>
        </ModalOverlay>,
        modalRoot
    )
};

export default Modal;