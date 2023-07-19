import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getImagePixabay from '../../services/api';
import { GalleryStyled, GalleryTytleStyled } from './ImageGalleryStyled';
import {ImageGalleryItem} from '../ImageGalleryItem/ImageGalleryItem';
import Modal from '../Modal/Modal';
import { Button } from '../Button/Button';
import { LoaderSpinner } from '../Loader/Loader';

class ImageGallery extends Component {
    state = {
        showModal: false,
        images: [],
        status: 'idle',
        pageNumber: 1,
        total: 0,
        largeImage: '',
    };

    componentDidUpdate(prevProps, prevState) {
        if (
            prevProps.input !== this.props.input ||
            prevState.pageNumber !== this.state.pageNumber
        ) {
            prevProps.input !== this.props.input
                ? this.setState({ images: [], status: 'pending', pageNumber: 1 })
                : this.setState({ status: 'resolved' });
        

        getImagePixabay(this.state.pageNumber, this.props.input)
            .then(({ hits, total }) => {
                if (total === 0) {
                    return this.state({ status: 'rejected' });
                }
                return this.setState(prevState =>{
                    return(
                        {
                            images: [...prevState.images, ...hits],
                            status: 'resolved',
                            total,
                        }
                    )
                }
                );
            })
            .catch(error => this.setState({ status: 'rejected' }));
    }
    
    }

    openModal = img => {
        this.setState({ showModal: true, largeImage: img });
    };
    closeModal = () => {
        this.setState({ showModal: false });
    };
    loadMore = () => {
        this.setState(prevState => ({ pageNumber: prevState.pageNumber + 1 }));
    };

    render() {
        const { images, status, total } = this.state;
        const { input } = this.props;

        if (status === 'idle') {
            return <GalleryTytleStyled>Enter word to search...</GalleryTytleStyled>;
        }

        if (status === 'pending') {
            return (
                <GalleryTytleStyled>
                    <LoaderSpinner /> Search...
                </GalleryTytleStyled>
            );
        }

        if (status === 'rejected') {
            return (
                <GalleryTytleStyled>
                    Not found. Try another word to search, please
                </GalleryTytleStyled>
            );      
        }

        if (status === 'resolved') {
            return (
                <>
                    <GalleryTytleStyled>
                        found {total} images by word to search {input}
                    </GalleryTytleStyled>
                    <GalleryStyled>
                        <ImageGalleryItem images={images} onOpenModal={this.openModal} />
                    </GalleryStyled>

                    {total > images.length && <Button loadMore={this.loadMore} />}
                    {this.state.showModal && (
                        <Modal
                            onCloseModal={this.closeModal}
                            largeImage={this.state.largeImage}
                        />
                    )}
                </>
            );
        }
    }
}

ImageGallery.propTypes = {
    input: PropTypes.string,
};

export default ImageGallery;
