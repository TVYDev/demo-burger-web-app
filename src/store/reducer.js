import * as actionTypes from './actions';

const initialState = {
  ingredients: {
    salad: 0,
    meat: 0,
    cheese: 0,
    bacon: 0
  },
  totalPrice: 4
};

const INGREDIENT_PRICES = {
  salad: 0.4,
  cheese: 0.8,
  bacon: 1.2,
  meat: 2.3
};

const reducer = (state = initialState, action) => {
  const { ingredientName } = action;
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [ingredientName]: state.ingredients[ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[ingredientName]
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [ingredientName]: state.ingredients[ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[ingredientName]
      };
    default:
      return state;
  }
};

export default reducer;
