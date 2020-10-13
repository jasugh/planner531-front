import React, {useState} from 'react';

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

import {Link as RouterLink} from 'react-router-dom';
import * as actions from '../../store/actions';
import {connect} from 'react-redux';

const Navbar = (props) => {
    const [drawerOpen, setDrawerOpen] = useState(false);

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
        <div style={ {display: "flex"} }>
            <Typography noWrap>
                <Tooltip title="Logout">
                    <Button
                        color="inherit"
                        onClick={ onLogout }
                        style={ {fontWeight: 700} }
                    >
                        {props.login.user}
                    </Button>
                </Tooltip>
            </Typography>
        </div>
    );

    const guestLinks = (
        <div style={ {display: "flex"} }>
            <Typography noWrap>
                <Button
                    component={ renderLink }
                    to="/login"
                    color="inherit"
                    style={ {fontWeight: 700} }
                >
                    Login
                </Button>
            </Typography>
        </div>
    );

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={ onSetDrawerOpen }
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography>
                        <Button
                            component={ renderLink }
                            to="/"
                            color="inherit"
                            style={ {fontWeight: 700} }
                        >
                            5/3/1 Calculator
                        </Button>
                    </Typography>
                    <section style={ {marginLeft: "auto", marginRight: 10} }>
                        { props.login.authenticated ? authLinks : guestLinks }
                    </section>
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
                        to="/starting"
                    >
                        <ListItemText primary="Starting Details"/>
                    </ListItem>
                    <ListItem
                        button
                        onClick={ onSetDrawerOpen }
                        component={ renderLink }
                        to="/plan"
                    >
                        <ListItemText primary="Workout Plan"/>
                    </ListItem>
                </List>
            </Drawer>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        login: state.login,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logoutUser())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

