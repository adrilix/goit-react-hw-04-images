import React, { useState, useEffect } from 'react'
import { DivStyled } from './AppStyled';

import { Searchbar } from 'components/Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import getImagePixabay from 'services/api';

export default function App() {
    const [images, setImages] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [inputNameImages, setInputNameImages] = useState('');
    const [status, setStatus] = useState('idle');
    const [showModal, setShowModal] = useState(false);
    const [largeImage, setLargeImage] = useState('');
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (!inputNameImages) {
            return;
        }
        getImagePixabay(pageNumber, inputNameImages)
        .then(({ hits, total }) => {
            if (total === 0) {
                return setStatus('rejected');
            }
            return (
                setImages(prevImages =>[...prevImages, ...hits]),
                setStatus('resolved'),
                setTotal(total)
                )
        }
        )
        .catch(error => setStatus('rejected'))

    
    }, [inputNameImages, pageNumber]);


    const handleSearchFormSubmit = (inputNameImages) => {
        setInputNameImages(inputNameImages);
        setImages([]);
        setPageNumber(1);
    }

    const openModal = (img) => {
        setShowModal(true);
        setLargeImage(img);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    const loadMore = () => {
        setPageNumber(prevState => prevState + 1);
    }

    
        return (
          <DivStyled>
            <Searchbar onSubmit = {handleSearchFormSubmit}></Searchbar>
            <ImageGallery 
            input = {inputNameImages} 
            status = {status}
            total = {total}
            images = {images}
            largeImage = {largeImage}
            openModal = {openModal}
            loadMore = {loadMore}
            closeModal = {closeModal}
            showModal = {showModal}
    
            ></ImageGallery>
          </DivStyled>
        );
} 

