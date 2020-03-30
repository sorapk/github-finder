import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users, { UserType } from './components/users/Users';
import React, {
  Component,
  Fragment,
  useState,
  useEffect,
  useContext
} from 'react';
import Search from './components/users/Search';
import Alert, { AlertType } from './components/layout/Alert';
import { About } from './components/pages/About';
import User from './components/users/User';
import GithubState from './context/github/GithubState';
import GithubContext from './context/github/githubContext';

const API_BASE_URL = 'https://api.github.com';

interface AppState {
  users: any[];
  loading: boolean;
  alert: AlertType;
  user: {} | null;
  repos: any[];
}

const _App = () => {
  const githubContext = useContext(GithubContext);

  const [alert, setAlertState] = useState<AlertType>(null);

  useEffect(() => {
    githubContext.searchUsers('');
    return () => {
      // cleanup
    };
  }, []);

  const setAlert = (text: string, type: string, timeout_ms?: number) => {
    setAlertState({ text: text, type: type });
    setTimeout(() => setAlertState(null), timeout_ms ? timeout_ms : 8000);
  };

  return (
    <BrowserRouter>
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Alert alert={alert} />
          <Switch>
            <Route
              exact
              path='/'
              render={props => (
                <Fragment>
                  <Search setAlert={setAlert} />
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
      <FuncComp />
    </GithubState>
  );
};

const App = WithContext(_App);

export default App;
