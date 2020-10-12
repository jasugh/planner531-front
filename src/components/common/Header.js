import {Grid} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import PropTypes from 'prop-types';

const Header = ({header}) => {
    return (
        <Grid container justify='center' style={ {marginTop: 10} }>
            <Typography
                color="primary"
                variant="h6"
            >
                { header }
            </Typography>
        </Grid>
    );
};

Header.propTypes = {
    header: PropTypes.string
}

export default Header;
