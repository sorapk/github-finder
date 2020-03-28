import React, { Component } from 'react';

interface SearchProp {
  searchUser: (user: string) => void;
}

class Search extends Component<SearchProp, {}> {
  state = {
    text: ''
  };
  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    this.props.searchUser(this.state.text);
    e.preventDefault();
    this.setState({ text: '' });
  };
  render() {
    return (
      <div>
        <form className='form' onSubmit={this.onSubmit}>
          <input
            type='text'
            name='text'
            placeholder='Search Users...'
            onChange={this.onChange}
          ></input>
          <input
            type='submit'
            value='Search'
            className='btn btn-dark btn-bloc'
          ></input>
        </form>
      </div>
    );
  }
}

export default Search;
