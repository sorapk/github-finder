import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './users/Users';
import React, { Component } from 'react';

export default class App extends Component {
  state = {
    users: [],
    loading: false
  };
  async componentDidMount() {
    this.setState({ loading: true });

    const header = new Headers();
    header.append('Accept', 'application/json');
    header.append(
      'Authorization',
      `Basic ${process.env.REACT_APP_GITHUB_CLIENT_ID}:${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    const request = new Request('https://api.github.com/users', {
      method: 'GET',
      headers: header
    });

    try {
      const response = await fetch(request);
      let jsondata;
      if (response.ok) {
        jsondata = await response.json();
        this.setState({ loading: false, users: jsondata });
      } else {
        throw new Error('Response not ok');
      }
    } catch (e) {
      console.error(e);
    }
    this.setState({ loading: false });
  }
  render() {
    return (
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
  }
}
