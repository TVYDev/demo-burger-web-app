import React from 'react';
import axios from '../../../axios-orders';
import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends React.Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice.toFixed(2),
      customer: {
        name: 'Homee111',
        address: 'testAddress'
      },
      deliveryMethod: 'fastest'
    };

    axios
      .post('/orders.json', order)
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
      .finally(() => {
        this.setState({ loading: false });
        this.props.history.push('/');
      });
  };

  renderOrderForm = () => {
    if (this.state.loading) {
      return <Spinner />;
    } else {
      return (
        <form>
          <input
            className={classes.Input}
            type="text"
            name="name"
            placeholder="Your Name"
          />
          <input
            className={classes.Input}
            type="text"
            name="email"
            placeholder="Your Email"
          />
          <input
            className={classes.Input}
            type="text"
            name="street"
            placeholder="Street"
          />
          <input
            className={classes.Input}
            type="text"
            name="postalCode"
            placeholder="Postal Code"
          />
          <Button btnType="Success" onClick={this.orderHandler}>
            ORDER
          </Button>
        </form>
      );
    }
  };

  render() {
    return (
      <div className={classes.ContactData}>
        <h3>Please fill in your contact data:</h3>
        {this.renderOrderForm()}
      </div>
    );
  }
}

export default ContactData;
