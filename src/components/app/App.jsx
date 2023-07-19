import React, { Component } from 'react';
import { DivStyled } from './AppStyled';
import {Searchbar} from 'components/Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';


export class App extends Component {
  state = {
    inputNameImages: "",
  };

  handleSearchFormSubmit = inputNameImages => {
      this.setState({inputNameImages});
  };

  render() {
    return (
      <DivStyled>
        <Searchbar onSubmit = {this.handleSearchFormSubmit}></Searchbar>
        <ImageGallery input = {this.state.inputNameImages}></ImageGallery>
      </DivStyled>
    );
  } 
}

export default App;
