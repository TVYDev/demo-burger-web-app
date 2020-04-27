import React from 'react';
import PropTypes from 'prop-types';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Meat', type: 'meat' },
];

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>
      Current Price: <strong>{props.price.toFixed(2)}</strong>
    </p>
    {controls.map((ctrl) => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        onAdd={() => props.onIngredientAdd(ctrl.type)}
        onRemove={() => props.onIngredientRemove(ctrl.type)}
        disabled={props.disabledControlsInfo[ctrl.type]}
      />
    ))}
    <button
      className={classes.OrderButton}
      disabled={!props.purchaseable}
      onClick={props.onOrder}
    >
      ORDER NOW
    </button>
  </div>
);

buildControls.propTypes = {
  price: PropTypes.number.isRequired,
  onIngredientAdd: PropTypes.func.isRequired,
  onIngredientRemove: PropTypes.func.isRequired,
  disabledControlsInfo: PropTypes.object.isRequired,
};

export default buildControls;
