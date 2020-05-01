import React from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends React.Component {
  constructor(props) {
    super(props);

    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      // ['salad', '1']
      if (param[0] === 'price') {
        price = +param[1];
      } else {
        ingredients[param[0]] = +param[1]; // use prefix(+) to convert to number
      }
    }

    this.state = {
      ingredients,
      totalPrice: price
    };
  }

  cancelCheckoutHandler = () => {
    this.props.history.goBack();
  };

  continueCheckoutHandler = () => {
    this.props.history.push('/checkout/contact-data');
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          onCancelCheckout={this.cancelCheckoutHandler}
          onContinueCheckout={this.continueCheckoutHandler}
        />
        <Route
          path={`${this.props.match.path}/contact-data`}
          render={(props) => (
            <ContactData
              ingredients={this.state.ingredients}
              totalPrice={this.state.totalPrice}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
