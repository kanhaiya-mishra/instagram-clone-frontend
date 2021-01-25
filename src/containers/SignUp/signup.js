import React, { useState, useRef, useEffect } from 'react';
import './signup.css';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import Toastr from '../../components/snackbar-component/snackbar';
import { Link, useHistory } from 'react-router-dom';
import DBLayer from '../../dblayer';
import AppLoader from '../../components/app-loader-component/app-loader';
import UserService from '../../services/user-service';

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
        '&:hover': {
            backgroundColor: theme.palette.primary.main
        }
    }
}));

const SignUp = () => {
    const classes = useStyles();
    const history = useHistory();
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showLoader, setShowLoader] = useState(false);
    const toastrRef = useRef();

    useEffect(() => {
        // If user is signed in already, show home page
        if (UserService.getUser()) {
            history.push("/");
        }
    }, [])

    const changeName = (event) => {
        setName(event.target.value);
    }

    const changeUsername = (event) => {
        setUsername(event.target.value);
    }

    const changePassword = (event) => {
        setPassword(event.target.value);
    }

    const changeConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
    }

    const validateInputData = () => {
        const toastrRefCurrent = toastrRef && toastrRef.current ? toastrRef.current : undefined;
        if (name.length < 1 || username.length < 1 || password.length < 1 || confirmPassword.length < 1) {
            toastrRefCurrent.handleClick('Please enter all fields!', 'error');
            return false;
        }
        if (password.length < 8) {
            toastrRefCurrent.handleClick('Password should have atleast 8 characters!', 'info');
            return false;
        }
        if (password !== confirmPassword) {
            toastrRefCurrent.handleClick('Password and Confirm password do not match!', 'info');
            return false;
        }
        return true;
    }

    const onSignUp = () => {
        if (validateInputData()) {
            setShowLoader(true);
            DBLayer.signUp({ name, username, password })
                .then(() => {
                    setShowLoader(false);
                    const toastrRefCurrent = toastrRef && toastrRef.current ? toastrRef.current : undefined;
                    toastrRefCurrent.handleClick('You have been successfully Signed Up!', 'success');
                    history.push("/signin");
                })
                .catch((err) => {
                    setShowLoader(false);
                    const toastrRefCurrent = toastrRef && toastrRef.current ? toastrRef.current : undefined;
                    toastrRefCurrent.handleClick('An error occured, try again!', 'error');
                })
        }
    }
    
    return (
        <div className="signup-page">
            <div className="signup-container">
                <Toastr ref={toastrRef} />
                <AppLoader showLoader={showLoader} />
                <div className="signup-logo-form">
                    <div className="signup-logo">
                        <img src="/logo/app-logo.png"
                            alt="Instagram Logo"
                        />
                    </div>
                    <div className="signup-form">
                        <InstagramTextField
                            label="Name"
                            className={classes.margin}
                            InputLabelProps={{
                                classes: {
                                    root: classes.labelRoot,
                                    focused: classes.labelFocused
                                }
                            }}
                            value={name}
                            onChange={changeName}
                            variant="filled"
                            id="signup-name"
                        />
                        <InstagramTextField
                            label="Username"
                            className={classes.margin}
                            InputLabelProps={{
                                classes: {
                                    root: classes.labelRoot,
                                    focused: classes.labelFocused
                                }
                            }}
                            value={username}
                            onChange={changeUsername}
                            variant="filled"
                            id="signup-username"
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
                            type="password"
                            value={password}
                            onChange={changePassword}
                            variant="filled"
                            id="signup-password"
                        />
                        <InstagramTextField
                            label="Confirm Password"
                            className={classes.margin}
                            InputLabelProps={{
                                classes: {
                                    root: classes.labelRoot,
                                    focused: classes.labelFocused
                                }
                            }}
                            type="password"
                            value={confirmPassword}
                            onChange={changeConfirmPassword}
                            variant="filled"
                            id="signup-confirm-password"
                        />
                        <Button variant="contained"
                            type="submit"
                            color="primary"
                            className={classes.button}
                            onClick={onSignUp}
                            disableElevation>
                            Sign up
                        </Button>
                    </div>
                </div>
                <div className="signup-signin">
                    Have an account?&nbsp;<Link to="/signin" className="signup-signin-link">Sign in</Link>
                </div>
            </div>
        </div>
    )
}

export default SignUp;