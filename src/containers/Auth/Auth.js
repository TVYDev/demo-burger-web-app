import React from 'react';
import classes from './Auth.module.css';
import { connect } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

class Auth extends React.Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Address'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignup: true
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

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedControls = {
            ...this.state.controls,
            [inputIdentifier]: {
                ...this.state.controls[inputIdentifier],
                value: event.target.value,
                valid: this.checkValidity(
                    event.target.value,
                    this.state.controls[inputIdentifier].validation
                ),
                touched: true
            }
        };

        this.setState({ controls: updatedControls });
    };

    formSubmitHandler = (event) => {
        event.preventDefault();
        const { controls, isSignup } = this.state;
        this.props.onAuth(
            controls.email.value,
            controls.password.value,
            isSignup
        );
    };

    switchFormModeHandler = () => {
        this.setState((previousState) => {
            return { isSignup: !previousState.isSignup };
        });
    };

    getFormSubmitErrorMessage = () => {
        if (this.props.error) {
            return <p>{this.props.error.message}</p>
        }
        return null;
    }

    render() {
        let form = null;

        if (this.props.loading) {
            form = <Spinner />;
        } else {
            const formElementArray = [];
            for (let key in this.state.controls) {
                formElementArray.push({
                    id: key,
                    config: this.state.controls[key]
                });
            }

            form = (
                <React.Fragment>
                    {this.getFormSubmitErrorMessage()}
                    <form onSubmit={this.formSubmitHandler}>
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
                                    this.inputChangedHandler(
                                        event,
                                        formElement.id
                                    )
                                }
                            />
                        ))}
                        <Button btnType="Success">SUBMIT</Button>
                    </form>
                    <Button
                        btnType="Danger"
                        onClick={this.switchFormModeHandler}
                    >
                        SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}
                    </Button>
                </React.Fragment>
            );
        }

        return <div className={classes.Auth}>{form}</div>;
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignup) =>
            dispatch(actions.auth(email, password, isSignup))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);