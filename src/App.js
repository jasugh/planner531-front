import React, {useEffect} from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {ThemeProvider} from '@material-ui/core/styles';
import {connect} from 'react-redux';

import theme from './theme';
import Navbar from './components/layout/Navbar';
// import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Exercise from './components/exercise/Exercise';
import Category from './components/category/Category';
import StartingDetails from './components/startingDetails/Start';
import WorkoutPlan from './components/workout/workoutDays/WorkoutDays';
import WorkoutDay from './components/workout/workoutDay/Workout'

import PrivateRoute from './components/common/PrivateRoute';
import * as actions from './store/actions/index';

const App = props => {

    useEffect(() => {
        props.onTryAutoSignup();
    }, []);

    let redirect = null;
    if (!props.login.authenticated) {
        redirect = <Redirect to="/login"/>;
    }

    return (
        <ThemeProvider theme={ theme }>
            { redirect }
            <Navbar/>
            <Switch>
                <Route exact path="/login" component={ Login }/>
                {/*<Route exact path="/" component={ Landing }/>*/}
                <PrivateRoute exact path="/category" component={ Category }/>
                <PrivateRoute exact path="/exercise" component={ Exercise }/>
                <PrivateRoute exact path="/starting" component={ StartingDetails }/>
                <PrivateRoute exact path="/plan" component={ WorkoutPlan }/>
                <PrivateRoute exact path="/workout" component={ WorkoutDay }/>
                <PrivateRoute exact path="/" component={ WorkoutDay }/>
                {/*<Redirect to="/"/>*/}
            </Switch>
        </ThemeProvider>
    );
};

const mapStateToProps = state => {
    return {
        login: state.login,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
