import React from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
  salad: 0.4,
  cheese: 0.8,
  bacon: 1.2,
  meat: 2.3,
};

class BurgerBuilder extends React.Component {
  state = {
    ingredients: {
      salad: 0,
      cheese: 0,
      bacon: 0,
      meat: 0,
    },
    totalPrice: 4,
  };

  ingredientAddHandler = (type) => {
    const cloneIngredients = { ...this.state.ingredients };
    cloneIngredients[type] += 1;

    const newTotalPrice = INGREDIENT_PRICES[type] + this.state.totalPrice;

    this.setState({ ingredients: cloneIngredients, totalPrice: newTotalPrice });
  };

  ingredientRemoveHandler = (type) => {
    if (this.state.ingredients[type] === 0) {
      return;
    }
    const cloneIngredients = { ...this.state.ingredients };
    cloneIngredients[type] -= 1;

    const newTotalPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

    this.setState({ ingredients: cloneIngredients, totalPrice: newTotalPrice });
  };

  render() {
    const disabledControlsInfo = { ...this.state.ingredients };
    for (let key in disabledControlsInfo) {
      disabledControlsInfo[key] = disabledControlsInfo[key] <= 0;
    }

    return (
      <React.Fragment>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          onIngredientAdd={this.ingredientAddHandler}
          onIngredientRemove={this.ingredientRemoveHandler}
          disabledControlsInfo={disabledControlsInfo}
        />
      </React.Fragment>
    );
  }
}

export default BurgerBuilder;
