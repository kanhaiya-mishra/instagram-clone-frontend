import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import AppHeader from './components/app-header-component/app-header';
import AppFooter from './components/app-footer-component/app-footer';
import Home from './containers/HomePage/home';
import SignIn from './containers/SignIn/signin';
import SignUp from './containers/SignUp/signup';
import Profile from './containers/Profile/profile';
import PrivateRoute from './components/private-route-component/private-route';
import { overrideTheme } from './override-theme';
import ErrorBoundary from './components/app-error-boundary/app-error-boundary';

function App() {
   return (
      <div className="app">
         <BrowserRouter>
            <ErrorBoundary>
               <AppHeader />
               <Switch>
                  <PrivateRoute path="/" exact component={overrideTheme(Home)} />
                  <Route path="/signin" component={overrideTheme(SignIn)} />
                  <Route path="/signup" component={overrideTheme(SignUp)} />
                  <PrivateRoute path="/profile/:id" component={overrideTheme(Profile)} />
               </Switch>
            </ErrorBoundary>
         </BrowserRouter>
         <AppFooter />
      </div>
   );
}

export default App;
