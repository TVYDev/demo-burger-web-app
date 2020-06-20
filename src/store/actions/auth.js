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

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path
    };
};

export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresDate');
    localStorage.removeItem('userId');

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

export const checkAuthState = () => {
    return (dispatch) => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(authLogout());
        } else {
            const expiresDate = new Date(localStorage.getItem('expiresDate'));
            if (expiresDate > new Date()) {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(
                    checkAuthExpired(
                        (expiresDate.getTime() - new Date().getTime()) / 1000
                    )
                );
            } else {
                dispatch(authLogout());
            }
        }
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
                const { idToken, expiresIn, localId } = response.data;
                const expiresDate = new Date(
                    new Date().getTime() + expiresIn * 1000
                );

                localStorage.setItem('token', idToken);
                localStorage.setItem('expiresDate', expiresDate);
                localStorage.setItem('userId', localId);

                dispatch(authSuccess(idToken, localId));
                dispatch(checkAuthExpired(expiresIn));
            })
            .catch((err) => {
                dispatch(authFail(err.response.data.error));
            });
    };
};
