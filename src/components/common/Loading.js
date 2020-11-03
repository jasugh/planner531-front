import {Grid} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';

const Loading = () => {
    return (
        <Grid style={ {marginTop: 20} } container justify="center">
            <CircularProgress/>
        </Grid>
    );
};

export default Loading;

