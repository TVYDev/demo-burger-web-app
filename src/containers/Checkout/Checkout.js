import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends React.Component {
  cancelCheckoutHandler = () => {
    this.props.history.goBack();
  };

  continueCheckoutHandler = () => {
    this.props.history.push('/checkout/contact-data');
  };

  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ingredients) {
      const purchaseRedirect = this.props.purchased ? (
        <Redirect to="/" />
      ) : null;
      return (
        <div>
          {purchaseRedirect}
          <CheckoutSummary
            ingredients={this.props.ingredients}
            onCancelCheckout={this.cancelCheckoutHandler}
            onContinueCheckout={this.continueCheckoutHandler}
          />
          <Route
            path={`${this.props.match.path}/contact-data`}
            component={ContactData}
          />
        </div>
      );
    }

    return summary;
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
};

export default connect(mapStateToProps)(Checkout);
