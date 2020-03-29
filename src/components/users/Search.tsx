import React, { Component } from 'react';

interface SearchProp {
  searchUser: (user: string) => void;
  clearUsers: () => void;
  setAlert: (text: string, type: string) => void;
  showClear: boolean;
}

class Search extends Component<SearchProp, {}> {
  state = {
    text: ''
  };
  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (this.state.text === '') {
      this.props.setAlert('Please enter something', 'light');
    } else {
      this.props.searchUser(this.state.text);
      this.setState({ text: '' });
    }
  };
  render() {
    return (
      <div>
        <form className='form' onSubmit={this.onSubmit}>
          <input
            type='text'
            name='text'
            placeholder='Search Users...'
            value={this.state.text}
            onChange={this.onChange}
          ></input>
          <input
            type='submit'
            value='Search'
            className='btn btn-dark btn-block'
          ></input>
        </form>
        {this.props.showClear && (
          <button
            className='btn btn-light btn-block'
            onClick={this.props.clearUsers}
          >
            Clear
          </button>
        )}
      </div>
    );
  }
}

export default Search;
