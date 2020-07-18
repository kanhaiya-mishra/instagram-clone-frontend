import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

import AppHeader from './components/app-header-component/app-header';
import Home from './containers/HomePage/home';
import SignIn from './containers/SignIn/signin';
import SignUp from './containers/SignUp/signup';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <AppHeader />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route exact path="/" component={Home} />
      </BrowserRouter>
    </div>
  );
}

export default App;
