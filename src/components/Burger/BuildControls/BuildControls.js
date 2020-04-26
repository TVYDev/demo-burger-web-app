import React from 'react';
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
    {controls.map((ctrl) => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        onAdd={() => props.onIngredientAdd(ctrl.type)}
        onRemove={() => props.onIngredientRemove(ctrl.type)}
        disabled={props.disabledControlsInfo[ctrl.type]}
      />
    ))}
  </div>
);

export default buildControls;
