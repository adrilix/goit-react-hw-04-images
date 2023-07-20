import React, { useState, useEffect } from 'react'

import {Searchbar} from 'components/Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import getImagePixabay from 'services/api';

export default function App () {
    const [images, setImages] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [inputNameImages, setInputNameImages] = useState('');
    const [status, setStatus] = useState('idle');
    const [sowModal, setShowModal] = useState(false);
    const [largeImage, setLargeImage] = useState('');
    const [total, setTotal] = useState(0);

useEffect(() => {
    {
        getImagePixabay(pageNumber, inputNameImages)
          .then(({ hits, total }) => {
              if (total === 0) {
                  return setStatus('rejected');
              }
              return this.setState(prevState =>{
                  return (
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

},[inputNameImages, pageNumber])

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
    setPageNumber( prevState => prevState + 1);
}




}