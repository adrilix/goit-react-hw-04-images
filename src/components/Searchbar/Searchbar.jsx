import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { 
            HeaderStyled,
            SearchFormButtonStyled,
            SearchFormStyled,
            SearchInputStyled,
            SearchIconStyled
        } from './SearchbarStyled';


export default function Searchbar ({onSubmit}) {
    const [inputNameImages, setInputNameImages] = useState('');

    const hendleInputChange = event => {
        setInputNameImages(event.currentTarget.value.trim().toLowerCase());
    };

    const hendleSubmit = event => {
        event.preventDefault();
        if (inputNameImages === '') {
            alert('enter word to search images, please');
            return;
        }

        onSubmit(inputNameImages);
        setInputNameImages('');
    };


        return (
        <HeaderStyled>
            <SearchFormStyled onSubmit={hendleSubmit}>
                <SearchFormButtonStyled type="submit">
                    <SearchIconStyled />
                </SearchFormButtonStyled>

                <SearchInputStyled
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={inputNameImages}
                    onChange={hendleInputChange}
                />
            </SearchFormStyled>

        </HeaderStyled>
    )
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func,
  }
  
