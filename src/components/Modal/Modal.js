import React from 'react';
import { deactivate } from '../../reducers/modal';

const Modal = ({ modal, id, children, dispatch, modalStyle, onCloseHandler }) => {
    const nf = () => {};
    const closeHandler = onCloseHandler || nf;
    if (!modal.active && modal.modalId !== id) return null;
    return (
        <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-content" style={modalStyle}>
                {children}
            </div>
            <button className="modal-close is-large" onClick={() => { closeHandler(); dispatch(deactivate()) }} aria-label="close"></button>
        </div>
    );
};

export default Modal;
