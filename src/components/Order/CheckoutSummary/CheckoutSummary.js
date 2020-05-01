import React from 'react';
import classes from './CheckoutSummary.module.css';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const checkoutSummary = (props) => (
  <div className={classes.CheckoutSummary}>
    <h3>Your burger is gonna taste great!</h3>
    <div className={classes.BurgerBlock}>
      <Burger ingredients={props.ingredients} />
    </div>
    <Button btnType="Danger" onClick={props.onCancelCheckout}>
      CANCEL
    </Button>
    <Button btnType="Success" onClick={props.onContinueCheckout}>
      CONTINUE
    </Button>
  </div>
);

export default checkoutSummary;
