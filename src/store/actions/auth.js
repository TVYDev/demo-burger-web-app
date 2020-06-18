import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token,
        userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    };
};

export const authLogout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthExpired = (expirationTime) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(authLogout());
        }, expirationTime * 1000);
    };
};

export const auth = (email, password, isSignup) => {
    return (dispatch) => {
        dispatch(authStart());

        const authData = {
            email,
            password,
            returnSecureToken: true
        };

        let url =
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCBtHF1jFpYDdUoVOJsd0sb80iBIQilRJY';
        if (!isSignup) {
            url =
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCBtHF1jFpYDdUoVOJsd0sb80iBIQilRJY';
        }

        axios
            .post(url, authData)
            .then((response) => {
                console.log(response);
                dispatch(
                    authSuccess(response.data.idToken, response.data.localId)
                );
                dispatch(checkAuthExpired(response.data.expiresIn));
            })
            .catch((err) => {
                console.log(err);
                dispatch(authFail(err.response.data.error));
            });
    };
};
