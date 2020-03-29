import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import React, { Component, Fragment } from 'react';
import Search from './components/users/Search';
import Alert, { AlertType } from './components/layout/Alert';
import { About } from './components/pages/About';
import User from './components/users/User';
import Callback from './components/users/Callback';

interface AppState {
  users: any[];
  loading: boolean;
  alert: AlertType;
  user: {} | null;
}

const API_BASE_URL = 'https://api.github.com';

export default class App extends Component<any, AppState> {
  state = {
    users: [],
    loading: false,
    alert: null,
    user: null
  };
  fetch = async (url: string) => {
    this.setState({ loading: true });
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

      this.setAlert(
        `Request Limit: ${xrem}/${xlimit} ....  Reset Time: ${resetDate}`,
        'warning',
        3000
      );

      if ('message' in jsondata) {
        this.setAlert(jsondata.message, 'warning');
      }
    } catch (e) {
      throw new Error('Bad Fetch');
    } finally {
      this.setState({ loading: false });
    }
    return jsondata;
  };
  searchUser = async (user: string) => {
    const jsondata = await this.fetch(`${API_BASE_URL}/search/users?q=${user}`);
    this.setState({ users: jsondata.items });
  };
  getUser = async (login: string) => {
    const jsondata = await this.fetch(`${API_BASE_URL}/users/${login}`);
    this.setState({ user: jsondata });
  };
  clearUsers = () => {
    this.setState({ users: [] });
  };
  setAlert = (text: string, type: string, timeout_ms?: number) => {
    this.setState({ alert: { text: text, type: type } });
    setTimeout(
      () => this.setState({ alert: null }),
      timeout_ms ? timeout_ms : 8000
    );
  };
  async componentDidMount() {
    const jsondata = await this.fetch(`${API_BASE_URL}/users`);
    this.setState({ users: typeof jsondata === typeof [] ? jsondata : [] });
  }
  render() {
    const { users, loading, user } = this.state;
    return (
      <BrowserRouter>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Alert alert={this.state.alert} />
            <Switch>
              <Route
                exact
                path='/'
                render={props => (
                  <Fragment>
                    <Search
                      searchUser={this.searchUser}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0}
                      setAlert={this.setAlert}
                    />
                    <Users loading={loading} users={users} />
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
                    getUser={this.getUser}
                    user={user}
                    loading={loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
