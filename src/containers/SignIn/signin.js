import React, { useState, useRef, useEffect } from 'react';
import './signin.css';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import Toastr from '../../components/snackbar-component/snackbar';
import { Link, useHistory } from 'react-router-dom';
import DBLayer from '../../dblayer';

const useStylesInstagram = makeStyles((theme) => ({
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

function InstagramTextField(props) {
    const classes = useStylesInstagram();

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
        marginTop: '20px',
        textTransform: 'none',
        backgroundColor: '#0095f6',
        '&:hover': {
            backgroundColor: '#0095f6'
        }
    }
}));

const SignIn = () => {

    const classes = useStyles();
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const toastrRef = useRef();
    const history = useHistory();

    useEffect(() => {
        // If user is signed in already, show home page
        if (false) history.push("/");
    }, [])

    const changeUsernameorEmail = (event) => {
        setUsernameOrEmail(event.target.value);
    }

    const changePassword = (event) => {
        setPassword(event.target.value);
    }

    const changeShowPassword = (event) => {
        setShowPassword(event.target.value);
    }

    const validateInputData = () => {
        const toastrRefCurrent = toastrRef && toastrRef.current ? toastrRef.current : undefined;
        if (usernameOrEmail.length < 1) {
            toastrRefCurrent.handleClick('Please enter a valid email or username!', 'error');
            return false;
        }
        if (password.length < 8) {
            toastrRefCurrent.handleClick('Password length should be atleast 8 characters', 'info');
            return false;
        }
        return true;
    }

    const onSignIn = () => {
        if (validateInputData()) {
            DBLayer.signIn({ usernameOrEmail, password })
                .then(() => {
                    history.push("/");
                })
        }
    }

    const comingSoon = () => {
        const toastrRefCurrent = toastrRef && toastrRef.current ? toastrRef.current : undefined;
        toastrRefCurrent.handleClick('Coming Soon :)', 'info');
    }

    return (
        <div className="signin-page">
            <div className="signin-container">
                <Toastr ref={toastrRef} />
                <div className="signin-logo-form">
                    <div className="signin-logo">
                        <img src="/logo/app-logo.png"
                            alt="Instagram Logo"
                        />
                    </div>
                    <div className="signin-form">
                        <InstagramTextField
                            label="Username or email"
                            className={classes.margin}
                            InputLabelProps={{
                                classes: {
                                    root: classes.labelRoot,
                                    focused: classes.labelFocused
                                }
                            }}
                            value={usernameOrEmail}
                            onChange={changeUsernameorEmail}
                            variant="filled"
                            id="signin-username-email"
                        />
                        <InstagramTextField
                            label="Password"
                            className={classes.margin}
                            InputLabelProps={{
                                classes: {
                                    root: classes.labelRoot,
                                    focused: classes.labelFocused
                                }
                            }}
                            value={password}
                            onChange={changePassword}
                            variant="filled"
                            id="signin-password"
                        />
                        <Button variant="contained"
                            type="submit"
                            className={classes.button}
                            onClick={onSignIn}
                            disableElevation>
                            Sign in
                        </Button>
                        <div className="signin-dash"><span className="signin-dash-text"> OR </span></div>
                        <div className="signin-login-with-facebook" onClick={comingSoon}>Login with Facebook</div>
                        <div className="forgot-password" onClick={comingSoon}>Forgot Password?</div>
                    </div>
                </div>
                <div className="signin-signup">
                    Don't have an account?&nbsp;<Link to="/signup" className="signin-signup-link">Sign up</Link>
                </div>
            </div>
        </div>
    )
}

export default SignIn;