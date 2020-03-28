import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import React, { Component } from 'react';
import Search from './components/users/Search';

export default class App extends Component {
  state = {
    users: [],
    loading: false
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

    const response = await fetch(request);
    const jsondata = await response.json();

    this.setState({ loading: false });

    return jsondata;
  };
  searchUser = async (user: string) => {
    const jsondata = await this.fetch(
      `https://api.github.com/search/users?q=${user}`
    );

    this.setState({ users: jsondata.items });
  };
  async componentDidMount() {
    const jsondata = await this.fetch('https://api.github.com/users');
    this.setState({ users: jsondata });
  }
  render() {
    return (
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Search searchUser={this.searchUser} />
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
  }
}
