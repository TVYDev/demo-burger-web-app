import React from 'react';
import { connect } from 'react-redux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends React.Component {
    state = {
        isSideDrawerClosed: true
    };

    sideDrawerClosedHandler = () => {
        this.setState({ isSideDrawerClosed: true });
    };

    drawerToggleHandler = () => {
        /**
         * Because this.setState() is asynchronous, we need to do this to avoid any unexpected value when
         * we setState based on previous state */
        this.setState((prevState) => {
            return { isSideDrawerClosed: !prevState.isSideDrawerClosed };
        });
    };

    render() {
        return (
            <React.Fragment>
                <Toolbar
                    onDrawerToggle={this.drawerToggleHandler}
                    isAuthenticated={this.props.isAuthenticated}
                />
                <SideDrawer
                    isSideDrawerClosed={this.state.isSideDrawerClosed}
                    onSideDrawerClosed={this.sideDrawerClosedHandler}
                    isAuthenticated={this.props.isAuthenticated}
                />
                <main className={classes.Content}>{this.props.children}</main>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);
