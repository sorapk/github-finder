import React, { useState, useContext } from 'react';
import GithubContext from '../../context/github/githubContext';

interface SearchProp {
  setAlert: (text: string, type: string) => void;
}

const Search = (props: SearchProp) => {
  const githubContext = useContext(GithubContext);

  const [text, setText] = useState<string>();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (text === '' || text === undefined) {
      props.setAlert('Please enter something', 'light');
    } else {
      githubContext.searchUsers(text);
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
      {githubContext.userList.length > 0 && (
        <button
          className='btn btn-light btn-block'
          onClick={githubContext.clearUsers}
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default Search;
