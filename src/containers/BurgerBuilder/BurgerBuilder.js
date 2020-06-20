import React from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends React.Component {
    state = {
        purchasing: false,
        loading: false
    };

    componentDidMount() {
        this.props.onIngredientInit();
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
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true });
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };

    purchaseContinueHandler = () => {
        this.props.onPurchaseInit();
        this.props.history.push('/checkout');
    };

    renderBurgerBuilder = () => {
        const { purchasing } = this.state;
        const { ingredients, totalPrice, error } = this.props;

        if (ingredients) {
            const disabledControlsInfo = { ...ingredients };
            for (let key in disabledControlsInfo) {
                disabledControlsInfo[key] = disabledControlsInfo[key] <= 0;
            }

            return (
                <React.Fragment>
                    <Modal
                        show={purchasing}
                        onBackdropClick={this.purchaseCancelHandler}
                    >
                        <OrderSummary
                            ingredients={this.props.ingredients}
                            totalPrice={this.props.totalPrice}
                            onPurchaseCancel={this.purchaseCancelHandler}
                            onPurchaseContinue={this.purchaseContinueHandler}
                        />
                    </Modal>
                    <Burger ingredients={ingredients} />
                    <BuildControls
                        disabledControlsInfo={disabledControlsInfo}
                        price={totalPrice}
                        purchaseable={this.updatePurchaseableState(ingredients)}
                        onIngredientAdd={this.props.onIngredientAdded}
                        onIngredientRemove={this.props.onIngredientRemoved}
                        onOrder={this.purchaseHandler}
                        isAuthenticated={this.props.isAuthenticated}
                    />
                </React.Fragment>
            );
        } else {
            return error ? (
                <p>Failed to load ingredients data!</p>
            ) : (
                <Spinner />
            );
        }
    };

    render() {
        return this.renderBurgerBuilder();
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingredientName) =>
            dispatch(actions.addIngredient(ingredientName)),
        onIngredientRemoved: (ingredientName) =>
            dispatch(actions.removeIngredient(ingredientName)),
        onIngredientInit: () => dispatch(actions.initIngredients()),
        onPurchaseInit: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) =>
            dispatch(actions.setAuthRedirectPath(path))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
