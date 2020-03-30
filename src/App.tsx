import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users, { UserType } from './components/users/Users';
import React, { Fragment, useEffect, useContext } from 'react';
import Search from './components/users/Search';
import Alert, { AlertType } from './components/layout/Alert';
import { About } from './components/pages/About';
import User from './components/users/User';
import GithubState from './context/github/GithubState';
import GithubContext from './context/github/githubContext';
import AlertState from './context/alert/AlertState';
import AlertContext from './context/alert/alertContext';

interface AppState {
  users: any[];
  loading: boolean;
  alert: AlertType;
  user: {} | null;
  repos: any[];
}

const _App = () => {
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);

  // Component Didmount
  useEffect(() => {
    githubContext.searchUsers('');
    return () => {
      // cleanup
    };
  }, []);

  // Component Did Update
  useEffect(() => {
    // warning user of API limit
    if (githubContext.apiLog !== '') {
      alertContext.setAlert(githubContext.apiLog, 'warning', 4000);
      githubContext.clearApiLog();
    }
    return () => {
      // cleanup
    };
  });

  return (
    <BrowserRouter>
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Alert />
          <Switch>
            <Route
              exact
              path='/'
              render={props => (
                <Fragment>
                  <Search />
                  <Users />
                </Fragment>
              )}
            />
            >
            <Route exact path='/about' component={About} />
            <Route
              exact
              path='/user/:login'
              render={props => <User {...props} />}
            />
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
