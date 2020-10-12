import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import isEmpty from '../../validation/is-empty';
import Alert from '@material-ui/lab/Alert';

const GeneralError = props => {

    const {error} = props;

    return (
        <Snackbar
            open={ !isEmpty(error.message) }
            anchorOrigin={ {vertical: 'bottom', horizontal: 'center' }}
        >
            <Alert severity="error">
                { error.message}
            </Alert>
        </Snackbar>
    );
};

export default GeneralError;

