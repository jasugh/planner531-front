import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({component: Component, login, ...rest}) => (
    <Route
        { ...rest }
        render={ props =>
            login.authenticated === true ? (
                <Component { ...props } />
            ) : (
                <Redirect to="/login"/>
            )
        }
    />
);

PrivateRoute.propTypes = {
    login: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    login: state.loginReducer
});

export default connect(mapStateToProps)(PrivateRoute);
