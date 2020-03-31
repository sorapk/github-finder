import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import React from 'react';
import Alert from './components/layout/Alert';
import { About } from './components/pages/About';
import User from './components/users/User';
import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';

const _App = () => {
  return (
    <BrowserRouter>
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Alert />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/github-finder' component={Home} />
            >
            <Route exact path='/about' component={About} />
            <Route
              exact
              path='/user/:login'
              render={props => <User {...props} />}
            />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};

const WithContext = (FuncComp: () => JSX.Element) => {
  return () => (
    <GithubState>
      <AlertState>
        <FuncComp />
      </AlertState>
    </GithubState>
  );
};

const App = WithContext(_App);

export default App;
