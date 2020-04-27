import React from 'react';
import PropTypes from 'prop-types';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => (
  <React.Fragment>
    {props.show ? <Backdrop onClick={props.onBackdropClick} /> : null}
    <div
      className={classes.Modal}
      style={{
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.show ? '1' : '0'
      }}
    >
      {props.children}
    </div>
  </React.Fragment>
);

modal.propTypes = {
  show: PropTypes.bool.isRequired
};

export default modal;
