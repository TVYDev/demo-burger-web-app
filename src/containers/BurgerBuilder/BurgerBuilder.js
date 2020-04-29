import React from 'react';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENT_PRICES = {
  salad: 0.4,
  cheese: 0.8,
  bacon: 1.2,
  meat: 2.3
};

class BurgerBuilder extends React.Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    axios
      .get('/ingredients.json')
      .then((response) => this.setState({ ingredients: response.data }))
      .catch((error) => this.setState({ error: true }));
  }

  updatePurchaseableState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igdKey) => {
        return ingredients[igdKey];
      })
      .reduce((sum, ele) => {
        return sum + ele;
      }, 0);
    this.setState({ purchaseable: sum > 0 });
  };

  ingredientAddHandler = (type) => {
    const cloneIngredients = { ...this.state.ingredients };
    cloneIngredients[type] += 1;

    const newTotalPrice = INGREDIENT_PRICES[type] + this.state.totalPrice;

    this.setState({ ingredients: cloneIngredients, totalPrice: newTotalPrice });
    this.updatePurchaseableState(cloneIngredients);
  };

  ingredientRemoveHandler = (type) => {
    if (this.state.ingredients[type] === 0) {
      return;
    }
    const cloneIngredients = { ...this.state.ingredients };
    cloneIngredients[type] -= 1;

    const newTotalPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

    this.setState({ ingredients: cloneIngredients, totalPrice: newTotalPrice });
    this.updatePurchaseableState(cloneIngredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Homee',
        address: 'testAddress'
      },
      deliveryMethod: 'fastest'
    };

    axios
      .post('/orders.json', order)
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
      .finally(() => {
        this.setState({ loading: false, purchasing: false });
      });
  };

  renderOrderSummary = () => {
    if (this.state.loading) {
      return <Spinner />;
    } else {
      return (
        <OrderSummary
          ingredients={this.state.ingredients}
          totalPrice={this.state.totalPrice}
          onPurchaseCancel={this.purchaseCancelHandler}
          onPurchaseContinue={this.purchaseContinueHandler}
        />
      );
    }
  };

  renderBurgerBuilder = () => {
    const {
      ingredients,
      totalPrice,
      purchaseable,
      purchasing,
      error
    } = this.state;

    if (ingredients) {
      const disabledControlsInfo = { ...ingredients };
      for (let key in disabledControlsInfo) {
        disabledControlsInfo[key] = disabledControlsInfo[key] <= 0;
      }

      return (
        <React.Fragment>
          <Modal show={purchasing} onBackdropClick={this.purchaseCancelHandler}>
            {this.renderOrderSummary()}
          </Modal>
          <Burger ingredients={ingredients} />
          <BuildControls
            disabledControlsInfo={disabledControlsInfo}
            price={totalPrice}
            purchaseable={purchaseable}
            onIngredientAdd={this.ingredientAddHandler}
            onIngredientRemove={this.ingredientRemoveHandler}
            onOrder={this.purchaseHandler}
          />
        </React.Fragment>
      );
    } else {
      return error ? <p>Failed to load ingredients data!</p> : <Spinner />;
    }
  };

  render() {
    return this.renderBurgerBuilder();
  }
}

export default withErrorHandler(BurgerBuilder, axios);
