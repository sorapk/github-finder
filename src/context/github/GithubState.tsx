import React, { useReducer, Reducer } from 'react';
import { eActionTypes } from '../types';
import GithubContext, {
  GithubContextState,
  InitGithubContextState
} from './githubContext';
import githubReducer, { GithubReducerAction } from './githubReducer';

const API_BASE_URL = 'https://api.github.com';

const GithubState = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer<
    Reducer<GithubContextState, GithubReducerAction>
  >(githubReducer, InitGithubContextState);

  // Data Fetcher
  const custFetch = async (url: string) => {
    setLoading();
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

      // setAlert(
      //   `Request Limit: ${xrem} (${xlimit}) ....  Reset Time: ${resetDate}`,
      //   'warning',
      //   3000
      // );

      // if ('message' in jsondata) {
      //   setAlert(jsondata.message, 'warning');
      // }
    } catch (e) {
      throw new Error('Bad Fetch');
    } finally {
      // setLoadingState(false);
    }
    return jsondata;
  };

  // Search Users
  const searchUsers = async (user: string) => {
    const jsondata = await custFetch(`${API_BASE_URL}/search/users?q=${user}`);
    // setUsersListState(jsondata.items);
    dispatch({
      type: eActionTypes.SEARCH_USER,
      payload: jsondata.items
    });
  };
  // Get User
  const getUser = async (login: string) => {
    const jsondata = await custFetch(`${API_BASE_URL}/users/${login}`);

    dispatch({
      type: eActionTypes.GET_USER,
      payload: jsondata
    });
  };
  // Get Repos
  const getUserRepos = async (login: string) => {
    const jsondata = await custFetch(
      `${API_BASE_URL}/users/${login}/repos?per_page=5&sort=created:asc`
    );
    dispatch({
      type: eActionTypes.GET_REPOS,
      payload: jsondata
    });
  };
  // Clear Users
  const clearUsers = () => {
    dispatch({
      type: eActionTypes.CLEAR_USERS
    });
  };
  // Set Loading
  const setLoading = () => {
    dispatch({
      type: eActionTypes.SET_LOADING
    });
  };

  //Return Provider
  return (
    <GithubContext.Provider
      value={{
        userList: state.userList,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers: searchUsers,
        clearUsers: clearUsers,
        getUser: getUser,
        getUserRepos: getUserRepos
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};
export default GithubState;
