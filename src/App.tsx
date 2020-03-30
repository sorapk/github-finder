import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users, { UserType } from './components/users/Users';
import React, { Component, Fragment, useState, useEffect } from 'react';
import Search from './components/users/Search';
import Alert, { AlertType } from './components/layout/Alert';
import { About } from './components/pages/About';
import User from './components/users/User';

const API_BASE_URL = 'https://api.github.com';

interface AppState {
  users: any[];
  loading: boolean;
  alert: AlertType;
  user: {} | null;
  repos: any[];
}

const App = () => {
  const [userList, setUsersListState] = useState<UserType[]>([]);
  const [user, setUserState] = useState<UserType | null>(null);
  const [repos, setReposState] = useState<string[]>([]);
  const [alert, setAlertState] = useState<AlertType>(null);
  const [loading, setLoadingState] = useState<boolean>(false);

  useEffect(() => {
    custFetch(`${API_BASE_URL}/users`).then(jsondata => {
      setUsersListState(typeof jsondata === typeof [] ? jsondata : []);
    });
    return () => {
      // cleanup
    };
  }, []);

  const custFetch = async (url: string) => {
    setLoadingState(true);
    const header = new Headers();
    header.append('Accept', 'application/json');
    header.set(
      'Authorization',
      'Basic ' +
        btoa(
          process.env.REACT_APP_GITHUB_CLIENT_ID +
            ':' +
            process.env.REACT_APP_GITHUB_CLIENT_SECRET
        )
    );
    const request = new Request(url, {
      method: 'GET',
      headers: header
    });
    let jsondata;
    try {
      const response = await fetch(request);
      jsondata = await response.json();

      const xlimit = response.headers.get('x-ratelimit-limit');
      const xrem = response.headers.get('x-ratelimit-remaining');
      let restepocStr = response.headers.get('x-ratelimit-reset');
      let restepocNum: number =
        restepocStr !== null ? parseInt(restepocStr) : 0;
      const resetDate = new Date(restepocNum * 1000).toLocaleTimeString();

      response.headers.forEach((val, key) => console.log(val, key));

      setAlert(
        `Request Limit: ${xrem} (${xlimit}) ....  Reset Time: ${resetDate}`,
        'warning',
        3000
      );

      if ('message' in jsondata) {
        setAlert(jsondata.message, 'warning');
      }
    } catch (e) {
      throw new Error('Bad Fetch');
    } finally {
      setLoadingState(false);
    }
    return jsondata;
  };
  const searchUsers = async (user: string) => {
    const jsondata = await custFetch(`${API_BASE_URL}/search/users?q=${user}`);
    setUsersListState(jsondata.items);
  };
  const getUser = async (login: string) => {
    const jsondata = await custFetch(`${API_BASE_URL}/users/${login}`);
    setUserState(jsondata);
  };
  const getUserRepos = async (login: string) => {
    const jsondata = await custFetch(
      `${API_BASE_URL}/users/${login}/repos?per_page=5&sort=created:asc`
    );
    setReposState(jsondata);
  };
  const clearUsers = () => {
    setUsersListState([]);
  };
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
                  <Search
                    searchUser={searchUsers}
                    clearUsers={clearUsers}
                    showClear={userList.length > 0}
                    setAlert={setAlert}
                  />
                  <Users loading={loading} users={userList} />
                </Fragment>
              )}
            />
            >
            <Route exact path='/about' component={About} />
            <Route
              exact
              path='/user/:login'
              render={props => (
                <User
                  {...props}
                  getUser={getUser}
                  getUserRepos={getUserRepos}
                  user={user}
                  repos={repos}
                  loading={loading}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};
export default App;
