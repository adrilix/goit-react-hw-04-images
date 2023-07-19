import React from 'react';
import PropTypes from 'prop-types';
import {
    GalleryItemStyled,
    GalleryItemImageStyled,
} from './ImageGalleryItemStyled';

export const ImageGalleryItem = ({ images, onOpenModal }) => {

    return images.map(({ id, webformatURL, largeImageURL, tags }) => (
        
        <GalleryItemStyled
            key={id}
            id={id}
            onClick={()=>onOpenModal(largeImageURL)}
        >
            <GalleryItemImageStyled src={webformatURL} alt={tags} />
        </GalleryItemStyled>
    ));
};

ImageGalleryItem.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            webformatURL: PropTypes.string.isRequired,
            largeImageURL: PropTypes.string.isRequired,
            tags: PropTypes.string,
        })
    ),
    onOpenModal: PropTypes.func,
};
