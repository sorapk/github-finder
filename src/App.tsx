import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import React, { Component } from 'react';
import Search from './components/users/Search';
import Alert, { AlertType } from './components/layout/Alert';

interface AppState {
  users: any[];
  loading: boolean;
  alert: AlertType;
}

export default class App extends Component<any, AppState> {
  state = {
    users: [],
    loading: false,
    alert: null
  };
  fetch = async (url: string) => {
    this.setState({ loading: true });

    const header = new Headers();
    header.append('Accept', 'application/json');
    header.append(
      'Authorization',
      `Basic ${process.env.REACT_APP_GITHUB_CLIENT_ID}:${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    const request = new Request(url, {
      method: 'GET',
      headers: header
    });
    let jsondata;
    try {
      const response = await fetch(request);
      jsondata = await response.json();
    } catch (e) {
      throw new Error('Bad Fetch');
    } finally {
      this.setState({ loading: false });
    }
    return jsondata;
  };
  searchUser = async (user: string) => {
    const jsondata = await this.fetch(
      `https://api.github.com/search/users?q=${user}`
    );

    this.setState({ users: jsondata.items });
  };
  clearUsers = () => {
    this.setState({ users: [] });
  };
  setAlert = (text: string, type: string) => {
    this.setState({ alert: { text: text, type: type } });

    setTimeout(() => this.setState({ alert: null }), 4000);
  };
  async componentDidMount() {
    const jsondata = await this.fetch('https://api.github.com/users');
    this.setState({ users: jsondata });
  }
  render() {
    const { users, loading } = this.state;
    return (
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Alert alert={this.state.alert} />
          <Search
            searchUser={this.searchUser}
            clearUsers={this.clearUsers}
            showClear={users.length > 0}
            setAlert={this.setAlert}
          />
          <Users loading={loading} users={users} />
        </div>
      </div>
    );
  }
}
