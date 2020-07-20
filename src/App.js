import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

import AppHeader from './components/app-header-component/app-header';
import Home from './containers/HomePage/home';
import SignIn from './containers/SignIn/signin';
import SignUp from './containers/SignUp/signup';
import PrivateRoute from './components/private-route-component/private-route';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <AppHeader />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <PrivateRoute exact path="/" component={Home} />
      </BrowserRouter>
    </div>
  );
}

export default App;
