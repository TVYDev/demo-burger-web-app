import React from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends React.Component {
  state = {
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    // axios
    //   .get('/ingredients.json')
    //   .then((response) => this.setState({ ingredients: response.data }))
    //   .catch((error) => this.setState({ error: true }));
  }

  updatePurchaseableState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igdKey) => {
        return ingredients[igdKey];
      })
      .reduce((sum, ele) => {
        return sum + ele;
      }, 0);
    return sum > 0;
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  };

  renderOrderSummary = () => {
    if (this.state.loading) {
      return <Spinner />;
    } else {
      return (
        <OrderSummary
          ingredients={this.props.ingredients}
          totalPrice={this.props.totalPrice}
          onPurchaseCancel={this.purchaseCancelHandler}
          onPurchaseContinue={this.purchaseContinueHandler}
        />
      );
    }
  };

  renderBurgerBuilder = () => {
    const { purchasing, error } = this.state;
    const { ingredients, totalPrice } = this.props;

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
            purchaseable={this.updatePurchaseableState(ingredients)}
            onIngredientAdd={this.props.onIngredientAdded}
            onIngredientRemove={this.props.onIngredientRemoved}
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

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingredientName) =>
      dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName }),
    onIngredientRemoved: (ingredientName) =>
      dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
