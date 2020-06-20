import React from 'react';
import classes from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
    let siderDrawerClasses = [classes.SideDrawer];
    if (props.isSideDrawerClosed) {
        siderDrawerClasses.push(classes.Close);
    } else {
        siderDrawerClasses.push(classes.Open);
    }

    return (
        <React.Fragment>
            <Backdrop
                show={!props.isSideDrawerClosed}
                onClick={props.onSideDrawerClosed}
            />
            <div className={siderDrawerClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuthenticated} />
                </nav>
            </div>
        </React.Fragment>
    );
};

export default sideDrawer;
