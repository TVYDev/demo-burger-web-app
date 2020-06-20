import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
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
                totalPrice:
                    state.totalPrice + INGREDIENT_PRICES[ingredientName],
                building: true
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [ingredientName]: state.ingredients[ingredientName] - 1
                },
                totalPrice:
                    state.totalPrice - INGREDIENT_PRICES[ingredientName],
                building: true
            };
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                error: false,
                totalPrice: 4,
                building: false
            };
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            };
        default:
            return state;
    }
};

export default reducer;
