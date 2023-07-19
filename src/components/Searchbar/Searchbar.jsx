import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { 
            HeaderStyled,
            SearchFormButtonStyled,
            SearchFormStyled,
            SearchInputStyled,
            SearchIconStyled
        } from './SearchbarStyled';


export class Searchbar extends Component {
    state = {
        inputNameImages: '',
    };

    hendleInputChange = event => {
        this.setState({
            inputNameImages: event.currentTarget.value.trim().toLowerCase(),
        });
    };

    hendleSubmit = event => {
        event.preventDefault();
        if (this.state.inputNameImages === '') {
            alert('enter word to search images, please');
            return;
        }

        this.props.onSubmit(this.state.inputNameImages);
        this.setState({ inputNameImages: '' });
    };

    render() {
        return (
        <HeaderStyled>
            <SearchFormStyled onSubmit={this.hendleSubmit}>
                <SearchFormButtonStyled type="submit">
                    <SearchIconStyled />
                </SearchFormButtonStyled>

                <SearchInputStyled
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={this.state.inputNameImages}
                    onChange={this.hendleInputChange}
                />
            </SearchFormStyled>

        </HeaderStyled>
    )}
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func,
  }
  
