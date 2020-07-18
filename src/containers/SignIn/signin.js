import React from 'react';
import './signin.css';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStylesReddit = makeStyles((theme) => ({
    root: {
        border: '1px solid lightgray',
        overflow: 'hidden',
        borderRadius: 4,
        backgroundColor: '#fcfcfb',
        '&:hover': {
            backgroundColor: '#fcfcfb',
        },
        '&$focused': {
            backgroundColor: '#fcfcfb',
            borderColor: 'gray',
        },
    },
    focused: {}
}));

function RedditTextField(props) {
    const classes = useStylesReddit();

    return <TextField InputProps={{ classes, disableUnderline: true }} {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: "4px",
        width: "275px"
    },
    input: {
        padding: "15px 5px 5px"
    },
    labelRoot: {
        "&$labelFocused": {
            color: "gray"
        }
    },
    labelFocused: {},
    button: {
        color: 'white',
        fontWeight: 600,
        width: '275px',
        marginTop: '10px',
        textTransform: 'none',
        backgroundColor: '#0095f6',
        '&:hover': {
            backgroundColor: '#0095f6'
        }
    }
}));

const SignIn = () => {
    const classes = useStyles();
    return (
        <div className="signin-page">
            <div className="signin-container">
                <div className="signin-logo-form">
                    <div className="signin-logo">
                        <img src="/logo/app-logo.png"
                            alt="Instagram Logo"
                        />
                    </div>
                    <div className="signin-form">
                        <RedditTextField
                            label="Username or email"
                            className={classes.margin}
                            InputLabelProps={{
                                classes: {
                                    root: classes.labelRoot,
                                    focused: classes.labelFocused
                                }
                            }}
                            value=""
                            variant="filled"
                            id="signin-username-email"
                        />
                        <RedditTextField
                            label="Password"
                            className={classes.margin}
                            InputLabelProps={{
                                classes: {
                                    root: classes.labelRoot,
                                    focused: classes.labelFocused
                                }
                            }}
                            value=""
                            variant="filled"
                            id="signin-password"
                        />
                        <Button variant="contained"
                            type="submit"
                            className={classes.button}
                            disableElevation>
                            Sign in
                        </Button>
                        <div className="signin-dash"><span className="signin-dash-text"> OR </span></div>
                        <div className="signin-login-with-facebook">Login with Facebook</div>
                        <div className="forgot-password">Forgot Password?</div>
                    </div>
                </div>
                <div className="signin-signup">
                    Don't have an account?&nbsp;<span className="signin-signup-link">Sign up</span>
                </div>
            </div>
        </div>
    )
}

export default SignIn;