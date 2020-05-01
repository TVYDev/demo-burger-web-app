import React from 'react';
import classes from './Order.module.css';

const order = (props) => {
  const ingredientNames = Object.keys(props.ingredients).map((igdKey) => {
    return (
      <span
        className={classes.Ingredient}
        key={igdKey}
      >{`${igdKey} (${props.ingredients[igdKey]})`}</span>
    );
  });

  return (
    <div className={classes.Order}>
      <p>Ingredient: {ingredientNames}</p>
      <p>
        Total Price: <strong>USD {props.price}</strong>
      </p>
    </div>
  );
};

export default order;
