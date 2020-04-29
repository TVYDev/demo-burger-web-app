import React from 'react';
import PropTypes from 'prop-types';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.show !== nextProps.show ||
      this.props.children !== nextProps.children
    );
  }

  render() {
    return (
      <React.Fragment>
        <Backdrop show={this.props.show} onClick={this.props.onBackdropClick} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0'
          }}
        >
          {this.props.children}
        </div>
      </React.Fragment>
    );
  }
}

Modal.propTypes = {
  show: PropTypes.bool.isRequired
};

export default Modal;
