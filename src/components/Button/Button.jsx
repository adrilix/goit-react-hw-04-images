import React from 'react'
import PropTypes from 'prop-types'

import { ButtonLoadMoreStyled } from './ButtonStyled'

export const Button = ({loadMore}) => {
    return (
        <ButtonLoadMoreStyled type="button" onClick={()=>loadMore()}>Load more...</ButtonLoadMoreStyled>
    );
};

Button.propTypes = {
    loadMore: PropTypes.func.isRequired,
}