import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { OverlayStyled, ModalWindowStyled } from './ModalStyled'
import { createPortal } from 'react-dom'


const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {   
    componentDidMount(){
        window.addEventListener('keydown', this.hendleKeyDown);
    }

    componentWillUnmount(){
        window.removeEventListener('keydown', this.hendleKeyDown);
    }

    hendleKeyDown = event => {
        if (event.code === 'Escape'){
            this.props.onCloseModal();
        }
    };

    hendleOverlayClick = event => {
        if ( event.currentTarget === event.target) {
            this.props.onCloseModal();
        }
    };

    render () {
        return createPortal (
            <OverlayStyled onClick={this.hendleOverlayClick}>
                <ModalWindowStyled>
                    <img src = {this.props.largeImage} alt = "" />
                </ModalWindowStyled>
            </OverlayStyled>,
            modalRoot
        );
    }
}

Modal.propTypes = {
    onCloseModal: PropTypes.func,
    largeImage: PropTypes.string.isRequired,
}

export default Modal;