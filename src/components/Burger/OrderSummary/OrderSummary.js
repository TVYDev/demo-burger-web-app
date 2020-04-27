import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
  const orderSummaryList = Object.keys(props.ingredients).map((igdKey) => (
    <li key={igdKey}>
      <span style={{ textTransform: 'capitalize' }}>{igdKey}</span>:{' '}
      {props.ingredients[igdKey]}
    </li>
  ));

  return (
    <React.Fragment>
      <h3>Your Order</h3>
      <p>Your delicious burger has ingredients as following:</p>
      {orderSummaryList}
      <p>
        <strong>Total Price: {props.totalPrice.toFixed(2)}</strong>
      </p>
      <p>Continue to checkout?</p>
      <Button btnType="Danger" onClick={props.onPurchaseCancel}>
        CANCEL
      </Button>
      <Button btnType="Success" onClick={props.onPurchaseContinue}>
        CONTINUE
      </Button>
    </React.Fragment>
  );
};

orderSummary.propTypes = {
  ingredients: PropTypes.object.isRequired,
  totalPrice: PropTypes.number.isRequired
};

export default orderSummary;
