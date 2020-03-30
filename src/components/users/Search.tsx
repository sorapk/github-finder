import React, { Component, useState } from 'react';

interface SearchProp {
  searchUser: (user: string) => void;
  clearUsers: () => void;
  setAlert: (text: string, type: string) => void;
  showClear: boolean;
}

const Search = (props: SearchProp) => {
  const [text, setText] = useState<string>();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (text === '') {
      props.setAlert('Please enter something', 'light');
    } else {
      props.searchUser(text!);
      setText('');
    }
  };
  return (
    <div>
      <form className='form' onSubmit={onSubmit}>
        <input
          value={String(text ? text : '')}
          type='text'
          name='text'
          placeholder='Search Users...'
          onChange={onChange}
        ></input>
        <input
          type='submit'
          value='Search'
          className='btn btn-dark btn-block'
        ></input>
      </form>
      {props.showClear && (
        <button className='btn btn-light btn-block' onClick={props.clearUsers}>
          Clear
        </button>
      )}
    </div>
  );
};

export default Search;
