import React from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.4,
  cheese: 0.8,
  bacon: 1.2,
  meat: 2.3
};

class BurgerBuilder extends React.Component {
  state = {
    ingredients: {
      salad: 0,
      cheese: 0,
      bacon: 0,
      meat: 0
    },
    totalPrice: 4,
    purchaseable: false,
    purchasing: false
  };

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
    alert('You continued!');
  };

  render() {
    const { ingredients, totalPrice, purchaseable, purchasing } = this.state;

    const disabledControlsInfo = { ...ingredients };
    for (let key in disabledControlsInfo) {
      disabledControlsInfo[key] = disabledControlsInfo[key] <= 0;
    }

    return (
      <React.Fragment>
        <Modal show={purchasing} onBackdropClick={this.purchaseCancelHandler}>
          <OrderSummary
            ingredients={ingredients}
            totalPrice={totalPrice}
            onPurchaseCancel={this.purchaseCancelHandler}
            onPurchaseContinue={this.purchaseContinueHandler}
          />
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
  }
}

export default BurgerBuilder;
