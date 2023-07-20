import React, { Component } from 'react';
import { DivStyled } from './AppStyled';
import {Searchbar} from 'components/Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import getImagePixabay from 'services/api';



export class App extends Component {
  state = {
    images: [],
    pageNumber: 1,
    inputNameImages: "",
    status: 'idle',    
    showModal: false,
    largeImage: '',    
    total: 0,   
  };

  async componentDidUpdate(_, prevState) {
  
    if (
        prevState.inputNameImages !== this.state.inputNameImages ||
        prevState.pageNumber !== this.state.pageNumber
    ) {
      getImagePixabay(this.state.pageNumber, this.state.inputNameImages)
        .then(({ hits, total }) => {
            if (total === 0) {
                return this.state({ status: 'rejected' });
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

}

  handleSearchFormSubmit = inputNameImages => {
      this.setState({inputNameImages, images: [], pageNumber: 1 });
  };

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
    return (
      <DivStyled>
        <Searchbar onSubmit = {this.handleSearchFormSubmit}></Searchbar>
        <ImageGallery 
        input = {this.state.inputNameImages} 
        status = {this.state.status}
        total = {this.state.total}
        images = {this.state.images}
        largeImage = {this.state.largeImage}
        openModal = {this.openModal}
        loadMore = {this.loadMore}
        closeModal = {this.closeModal}
        showModal = {this.state.showModal}

        ></ImageGallery>
      </DivStyled>
    );
  } 
}

export default App;
