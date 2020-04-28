import React from 'react';
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
        <Toolbar onDrawerToggle={this.drawerToggleHandler} />
        <SideDrawer
          isSideDrawerClosed={this.state.isSideDrawerClosed}
          onSideDrawerClosed={this.sideDrawerClosedHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </React.Fragment>
    );
  }
}

export default Layout;
