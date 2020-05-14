import React from 'react';
import { connect } from 'react-redux';
import axios from '../../../axios-orders';
import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends React.Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      postalCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Postal Code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', display: 'Fastest' },
            { value: 'cheapest', display: 'Cheapest' }
          ]
        },
        value: 'fastest',
        validation: {},
        valid: true
      }
    },
    isFormValid: false,
    loading: false
  };

  checkValidity(value, rules) {
    let isValid = true;
    value = value.trim();

    if (rules.required) {
      isValid = value !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice.toFixed(2),
      orderData: formData
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

  inputChangedHandler = (event, inputIdentifier) => {
    const clonedOrderForm = { ...this.state.orderForm };
    const clonedFormElement = { ...clonedOrderForm[inputIdentifier] };
    clonedFormElement.value = event.target.value;
    clonedFormElement.valid = this.checkValidity(
      clonedFormElement.value,
      clonedFormElement.validation
    );
    clonedFormElement.touched = true;
    clonedOrderForm[inputIdentifier] = clonedFormElement;

    let isFormValid = true;
    for (let key in clonedOrderForm) {
      isFormValid = clonedOrderForm[key].valid && isFormValid;
    }

    this.setState({ orderForm: clonedOrderForm, isFormValid });
  };

  renderOrderForm = () => {
    if (this.state.loading) {
      return <Spinner />;
    } else {
      const formElementArray = [];
      for (let key in this.state.orderForm) {
        formElementArray.push({
          id: key,
          config: this.state.orderForm[key]
        });
      }

      return (
        <form onSubmit={this.orderHandler}>
          {formElementArray.map((formElement) => (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={
                !formElement.config.valid &&
                formElement.config.validation &&
                formElement.config.touched
              }
              onChange={(event) =>
                this.inputChangedHandler(event, formElement.id)
              }
            />
          ))}
          <Button btnType="Success" disabled={!this.state.isFormValid}>
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

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  };
};

export default connect(mapStateToProps)(ContactData);
