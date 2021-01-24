import React, {Fragment, useEffect, useState} from 'react';
import {Link as RouterLink} from 'react-router-dom';

import {connect} from 'react-redux';

import * as actions from '../../store/actions';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import {Alarm} from '@material-ui/icons';

import soundFile from './service-bell.mp3';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';
import {LinearProgress} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
        progressBar: {
            marginTop:64,
            position: 'fixed',
            width: '100%',
            // height: 100
        },
        bar1Determinate: {
            background: theme.palette.secondary.main,
            // background: "linear-gradient(to left, #f44336, #607d8b)",
        },
        linearPadding: {
            sticky: true,
            marginTop: 64,
            [theme.breakpoints.down("sm")]: {
                marginTop: 56
            }
        },
    })
);

const Navbar = (props) => {
    const classes = useStyles();

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [completed, setCompleted] = useState(0);
    const [progressTime, setProgressTime] = useState(1);
    const [isActive, setIsActive] = useState(false);
    const [ready, setReady] = useState(false);
    //*************************************************************************
    useEffect(() => {
        //Set rest time from main exercise data
        setSeconds(props.restTimer.restTime);

        if (props.restTimer.start && props.restTimer.restTime > 0) {
            setIsActive(true);
        }
        if (!props.restTimer.start) {
            setIsActive(false);
        }
    }, [props.restTimer]);

    useEffect(() => {
        let interval = null;

        if (isActive) {
            interval = setInterval(() => {
                setSeconds(seconds - 1);
                setProgressTime( progressTime + 1);

                progress(progressTime);

                restTimerTick(seconds);
                setReady(false);
            }, 1000);

        } else if (!isActive) {
            setSeconds(0);
            setCompleted(0);
            setProgressTime(1);

            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds, progressTime]);

    const restTimerTick = (s) => {
        if (s <= 1) {
            setIsActive(false);
            setReady(true);
        }
    };

    const progress = (p) => {
        if (completed >= 100) {
            setCompleted(0);
        } else {
            setCompleted((p / props.restTimer.restTime) * 100);
        }
    };
    //*************************************************************************
    const onSetDrawerOpen = () => {
        setDrawerOpen(!drawerOpen);
    };

    let renderLink = React.forwardRef((itemProps, ref) => (
        <RouterLink to={ props.to } { ...itemProps } innerRef={ ref }/>
    ));

    const onLogout = () => {
        props.onLogout();
    };

    const authLinks = (
        <Typography noWrap>
            <Tooltip title="Logout">
                <Button
                    style={ {fontWeight: 700, padding: 12} }
                    color="inherit"
                    onClick={ onLogout }
                >
                    { props.login.user }
                </Button>
            </Tooltip>
        </Typography>
    );

    const guestLinks = (
        <Typography noWrap>
            <Tooltip title="Log in">
                <Button
                    component={ renderLink }
                    to="/login"
                    color="inherit"
                    style={ {fontWeight: 700} }
                >
                    log in
                </Button>
            </Tooltip>
        </Typography>
    );

    let restTimer = [];

    if (props.login.authenticated) {
        if (ready) {
            const wakeUp = new Audio(soundFile);
            wakeUp.play();
        }

        if (isActive) {
            restTimer.push(
                <Typography
                    style={ {fontWeight: 500} }
                    key={ 't' }
                    color="inherit"
                    variant="h4"
                >
                    { seconds }
                </Typography>
            );
        } else {
            restTimer.push(
                <div key={ 3 }>
                    <IconButton
                        color="inherit"
                        style={ {padding: 0} }
                    >
                        <Alarm/>
                    </IconButton>
                </div>
            );
        }
    }

    return (
        <React.Fragment>
            <div>
                <AppBar position="fixed">
                    <Toolbar>
                        <Grid container direction="row" alignItems="center" spacing={ 1 }>
                            <Grid item xs={ 1 }>
                                <IconButton
                                    color="inherit"
                                    aria-label="Open drawer"
                                    onClick={ onSetDrawerOpen }
                                >
                                    <MenuIcon/>
                                </IconButton>
                            </Grid>

                            <Grid item xs={ 3 }>
                                <Box
                                    style={ {marginLeft: 20} }
                                    fontSize="h5.fontSize"
                                    color="inherit"
                                    // fontWeight="fontWeightBold"
                                    fontStyle="italic"
                                >
                                    5/3/1
                                </Box>
                            </Grid>

                            <Grid item xs={ 4 } style={ {textAlign: 'center'} }>
                                { restTimer }
                            </Grid>

                            {/*<Grid item xs={ 3 }/>*/ }

                            <Grid item xs={ 4 } style={ {textAlign: 'right'} }>
                                <section>
                                    { props.login.authenticated ? authLinks : guestLinks }
                                </section>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>

                <Drawer
                    anchor={ "left" }
                    open={ drawerOpen }
                    onClose={ onSetDrawerOpen }
                >
                    <List>
                        <ListItem
                            button
                            onClick={ onSetDrawerOpen }
                            component={ renderLink }
                            to="/workout"
                        >
                            <ListItemText primary="Next workout"/>
                        </ListItem>
                        <ListItem
                            button
                            onClick={ onSetDrawerOpen }
                            component={ renderLink }
                            to="/category"
                        >
                            <ListItemText primary="Categories"/>
                        </ListItem>
                        <ListItem
                            button
                            onClick={ onSetDrawerOpen }
                            component={ renderLink }
                            to="/exercise"
                        >
                            <ListItemText primary="Exercises"/>
                        </ListItem>
                        <ListItem
                            button
                            onClick={ onSetDrawerOpen }
                            component={ renderLink }
                            to="/main"
                        >
                            <ListItemText primary="Main Exercises"/>
                        </ListItem>
                        <ListItem
                            button
                            onClick={ onSetDrawerOpen }
                            component={ renderLink }
                            to="/assistance"
                        >
                            <ListItemText primary="Assistance Exercises"/>
                        </ListItem>
                        <ListItem
                            button
                            onClick={ onSetDrawerOpen }
                            component={ renderLink }
                            to="/starting"
                        >
                            <ListItemText primary="Starting Details"/>
                        </ListItem>
                    </List>
                </Drawer>
            </div>
            <div className={ classes.progressBar }>
                <LinearProgress
                    // className={classes.linearPadding}
                    classes={ {
                        bar1Determinate: classes.bar1Determinate,
                    } }
                    style={ {height: 10} }
                    variant="determinate"
                    value={ completed }
                />
            </div>
            <div style={ {paddingBottom: 20} }/>
        </React.Fragment>
    );
};

const mapStateToProps = state => {
    return {
        login: state.loginReducer,
        restTimer: state.restTimerReducer,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logoutUser()),
        onStopRestTimer: () => dispatch(actions.stopRestTimer())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

