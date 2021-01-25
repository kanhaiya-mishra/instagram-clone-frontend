import React, { useState, useRef, useEffect } from 'react';
import './signin.css';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, InputAdornment, IconButton } from '@material-ui/core';
import Toastr from '../../components/snackbar-component/snackbar';
import { Link, useHistory } from 'react-router-dom';
import DBLayer from '../../dblayer';
import UserService from '../../services/user-service';
import AppLoader from '../../components/app-loader-component/app-loader';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

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

   const { customInputProp } = props;
   const classes = useStylesInstagram();

   return <TextField InputProps={{ classes, disableUnderline: true, ...customInputProp }} {...props} />;
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

const SignIn = () => {

   const classes = useStyles();
   const [username, setUsername] = useState("justClickSignIn");
   const [password, setPassword] = useState("justClickSignIn");
   const [showLoader, setShowLoader] = useState(false);
   const [showPassword, setShowPassword] = useState(false);
   const toastrRef = useRef();
   const history = useHistory();

   useEffect(() => {
      // If user is signed in already, show home page
      if (UserService.getUser()) {
         history.push("/");
      }
   }, [])

   const changeUsername = (event) => {
      setUsername(event.target.value);
   }

   const changePassword = (event) => {
      setPassword(event.target.value);
   }

   const ifEnter = (e) => {
      if (e.which === 13) {
         e.stopPropagation();
         e.preventDefault();
         onSignIn();
      }
   }

   const changeShowPassword = () => {
      setShowPassword(!showPassword);
   }

   const validateInputData = () => {
      const toastrRefCurrent = toastrRef && toastrRef.current ? toastrRef.current : undefined;
      if (username.length < 1) {
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
      if (UserService.getUser()) {
         window.location.reoload();
         return;
      }
      if (validateInputData()) {
         setShowLoader(true);
         DBLayer.signIn({ username, password })
            .then((response) => {
               UserService.setUser(response.data);
               setShowLoader(false);
               history.push("/");
            })
            .catch((err) => {
               const toastrRefCurrent = toastrRef && toastrRef.current ? toastrRef.current : undefined;
               toastrRefCurrent.handleClick('Username/Password incorrect!', 'error');
               setShowLoader(false);
            })
      }
   }

   const comingSoon = () => {
      const toastrRefCurrent = toastrRef && toastrRef.current ? toastrRef.current : undefined;
      toastrRefCurrent.handleClick('Feature Coming Soon!', 'info');
   }

   return (
      <div className="signin-page">
         <div className="signin-container">
            <AppLoader showLoader={showLoader} />
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
                     value={username}
                     onChange={changeUsername}
                     onKeyPress={ifEnter}
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
                     customInputProp={{
                        endAdornment: (
                           < InputAdornment position="end" >
                              <IconButton
                                 aria-label="toggle password visibility"
                                 onClick={changeShowPassword}
                              >
                                 {showPassword ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                           </InputAdornment>)
                     }}
                     type={showPassword ? "text" : "password"}
                     value={password}
                     onChange={changePassword}
                     onKeyPress={ifEnter}
                     variant="filled"
                     id="signin-password"
                  />
                  <Button variant="contained"
                     type="submit"
                     color="primary"
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