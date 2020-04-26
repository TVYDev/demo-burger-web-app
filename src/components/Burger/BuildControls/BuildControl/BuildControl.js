import React from 'react';
import PropTypes from 'prop-types';
import classes from './BuildControl.module.css';

const buildControl = (props) => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    <button
      className={classes.Less}
      onClick={props.onRemove}
      disabled={props.disabled}
    >
      Less
    </button>
    <button className={classes.More} onClick={props.onAdd}>
      More
    </button>
  </div>
);

buildControl.propTypes = {
  label: PropTypes.string.isRequired,
};

export default buildControl;
