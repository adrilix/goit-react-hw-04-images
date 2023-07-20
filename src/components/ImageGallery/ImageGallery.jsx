import React from 'react';
import PropTypes from 'prop-types';

import { GalleryStyled, GalleryTytleStyled } from './ImageGalleryStyled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import Modal from '../Modal/Modal';
import { Button } from '../Button/Button';
import { LoaderSpinner } from '../Loader/Loader';

const ImageGallery = ({input,status,total,images,largeImage,openModal,loadMore,closeModal,showModal}) => {

    return (
        <>
            {status === 'idle' && (
                <GalleryTytleStyled>Enter word to search...</GalleryTytleStyled>
            )}

            {status === 'pending' && (
                <GalleryTytleStyled>
                    <LoaderSpinner /> Search...
                </GalleryTytleStyled>
            )}

            {status === 'rejected' && (
                <GalleryTytleStyled>
                    Not found. Try another word to search, please
                </GalleryTytleStyled>
            )}

            {status === 'resolved' && (
                <>
                    <GalleryTytleStyled>
                        found {total} images by word to search {input}
                    </GalleryTytleStyled>
                    <GalleryStyled>
                        <ImageGalleryItem images={images} onOpenModal={openModal} />
                    </GalleryStyled>

                    {total > images.length && <Button loadMore={loadMore} />}
                    {showModal && (
                        <Modal onCloseModal={closeModal} largeImage={largeImage} />
                    )}
                </>
            )}
        </>
    );
};

ImageGallery.propTypes = {
    input: PropTypes.string,
    status: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
    largeImage: PropTypes.string.isRequired,
    openModal: PropTypes.func.isRequired,
    loadMore: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    showModal: PropTypes.bool.isRequired,
        images: PropTypes.arrayOf(
            PropTypes.objectOf(
                PropTypes.node.isRequired,
            )
        )
};

export default ImageGallery;
