import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {Grid} from '@material-ui/core';

import * as actions from '../../store/actions/index';
import isEmpty from '../../validation/is-empty';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const Login = props => {
    const [loginName, setLoginName] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = (event) => {
        event.preventDefault();

        const userData = {
            loginName: loginName,
            password: password
        };

        props.onLogin(userData);
    };

    let authRedirect = null;
    if (props.login.authenticated) {
        authRedirect = <Redirect to="/"/>;
    }

    return (
        <div>
            <form>
                <Grid container justify='center'>
                    { authRedirect }
                    <Grid item>
                        <Card elevation={ 2 }>
                            <CardContent>
                                <Typography align='center' color='primary' variant='h6'>
                                    Log In
                                </Typography>
                                <TextField
                                    label='Login name'
                                    name='loginName'
                                    fullWidth
                                    onChange={ (event) => (setLoginName(event.target.value)) }
                                    error={ !isEmpty(props.error.message) }
                                    // helperText={ props.error.message }
                                    value={ loginName }
                                />
                                <TextField
                                    label='Password'
                                    name='password'
                                    type='password'
                                    fullWidth
                                    onChange={ (event) => (setPassword(event.target.value)) }
                                    error={ !isEmpty(props.error.message) }
                                    // helperText={ props.error.message }
                                    value={ password }
                                />
                            </CardContent>
                            <CardActions style={ {justifyContent: 'center'} }>
                                <Button
                                    type="submit"
                                    size='medium'
                                    variant='contained'
                                    color='primary'
                                    onClick={ onLogin }
                                >
                                    login
                                </Button>
                            </CardActions>
                            <Snackbar
                                open={ !isEmpty(props.error.message) }
                                anchorOrigin={ {vertical: 'bottom', horizontal: 'center'} }
                            >
                                <Alert severity="error">
                                    { props.error.message }
                                </Alert>
                            </Snackbar>
                        </Card>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        login: state.loginReducer,
        error: state.errorReducer
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (userData) => dispatch(actions.authenticateUser(userData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);


