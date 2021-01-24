import React, {useEffect} from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {makeStyles, ThemeProvider} from '@material-ui/core/styles';
import {connect} from 'react-redux';

import theme from './theme';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Exercise from './components/exercise/Exercise';
import Category from './components/category/Category';
import StartingDetails from './components/startingDetails/Start';
import WorkoutPlan from './components/workout/workoutDays/WorkoutDays';
import NextWorkout from './components/workout/nextWorkout/NextWorkout';
import PrivateRoute from './components/common/PrivateRoute';
import * as actions from './store/actions/index';
import AssistanceExercise from './components/assistanceExercise/AssistanceExercise';
import MainExercise from './components/mainExercise/MainExercise';

const styles = makeStyles((theme) => ({
    layout: {
        marginTop: 80,
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
        [theme.breakpoints.down('md')]: {
            width: 335,
            marginLeft: 'auto',
            marginRight: 'auto',
        }
    },
}));

const App = props => {

    useEffect(() => {
        props.onTryAutoSignup();
    }, []);

    // Styling
    const classes = styles();

    let redirect = null;
    if (!props.login.authenticated) {
        redirect = <Redirect to="/login"/>;
    }

    return (
        <ThemeProvider theme={ theme }>
            { redirect }
            <Navbar/>
            <div className={ classes.layout }>
                <Route exact path="/login" component={ Login }/>
                <Switch>
                    <PrivateRoute exact path="/workout" component={ NextWorkout }/>
                    <PrivateRoute exact path="/category" component={ Category }/>
                    <PrivateRoute exact path="/exercise" component={ Exercise }/>
                    <PrivateRoute exact path="/main" component={ MainExercise }/>
                    <PrivateRoute exact path="/assistance" component={ AssistanceExercise }/>
                    <PrivateRoute exact path="/starting" component={ StartingDetails }/>
                    <PrivateRoute exact path="/plan" component={ WorkoutPlan }/>
                    <PrivateRoute exact path="/" component={ NextWorkout }/>
                </Switch>
            </div>
        </ThemeProvider>
    );
};

const mapStateToProps = state => {
    return {
        login: state.loginReducer,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
