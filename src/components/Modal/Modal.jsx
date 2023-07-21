import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { OverlayStyled, ModalWindowStyled } from './ModalStyled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

function Modal({ onCloseModal, largeImage }) {
    
    useEffect(() => {
        window.addEventListener('keydown', hendleKeyDown);

        return () => {
            window.removeEventListener('keydown', hendleKeyDown);
        };
    });

    const hendleKeyDown = event => {
        if (event.code === 'Escape') {
            onCloseModal();
        }
    };

    const hendleOverlayClick = event => {
        if (event.currentTarget === event.target) {
            onCloseModal();
        }
    };

    return createPortal(
        <OverlayStyled onClick={hendleOverlayClick}>
            <ModalWindowStyled>
                <img src={largeImage} alt="" />
            </ModalWindowStyled>
        </OverlayStyled>,
        modalRoot
    );
}

Modal.propTypes = {
    onCloseModal: PropTypes.func,
    largeImage: PropTypes.string.isRequired,
};

export default Modal;
