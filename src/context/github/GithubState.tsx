import React, { useReducer, Reducer } from 'react';
import { eGithubActionTypes } from '../types';
import GithubContext, {
  GithubContextState,
  InitGithubContextState
} from './githubContext';
import githubReducer, { GithubReducerAction } from './githubReducer';

const API_BASE_URL = 'https://api.github.com';

const githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
const githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;

const GithubState = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer<
    Reducer<GithubContextState, GithubReducerAction>
  >(githubReducer, InitGithubContextState);
  // console.log('github state update', state);

  // Data Fetcher
  const custFetch = async (url: string) => {
    setLoading();
    const header = new Headers();
    header.append('Accept', 'application/json');
    header.set(
      'Authorization',
      'Basic ' + btoa(githubClientId + ':' + githubClientSecret)
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

      // response.headers.forEach((val, key) => console.log(val, key));

      setAPILog(
        `Request Limit: ${xrem} (${xlimit}) ....  Reset Time: ${resetDate}`
      );
      if ('message' in jsondata) {
        setAPILog(jsondata.message);
      }
    } catch (e) {
      throw new Error('Bad Fetch');
    } finally {
      // setLoadingState(false);
    }
    return jsondata;
  };
  // Search Users
  const searchUsers = async (user: string) => {
    let jsondata = [];

    if (user === '') {
      // Default Search
      jsondata = await custFetch(`${API_BASE_URL}/users`);
      dispatch({
        type: eGithubActionTypes.SEARCH_USER,
        payload: jsondata
      });
    } else {
      // Queried Search
      const jsondata = await custFetch(
        `${API_BASE_URL}/search/users?q=${user}`
      );
      dispatch({
        type: eGithubActionTypes.SEARCH_USER,
        payload: jsondata.items
      });
    }
  };
  // Get User
  const getUser = async (login: string) => {
    const jsondata = await custFetch(`${API_BASE_URL}/users/${login}`);

    dispatch({
      type: eGithubActionTypes.GET_USER,
      payload: jsondata
    });
  };
  // Get Repos
  const getUserRepos = async (login: string) => {
    const jsondata = await custFetch(
      `${API_BASE_URL}/users/${login}/repos?per_page=5&sort=created:asc`
    );
    dispatch({
      type: eGithubActionTypes.GET_REPOS,
      payload: jsondata
    });
  };
  // Clear Users
  const clearUsers = () => {
    dispatch({
      type: eGithubActionTypes.CLEAR_USERS
    });
  };
  // Set Loading
  const setLoading = () => {
    dispatch({
      type: eGithubActionTypes.SET_LOADING
    });
  };
  // Set API Log
  const setAPILog = (log: string) => {
    dispatch({
      type: eGithubActionTypes.SET_API_LOG,
      payload: log
    });
  };
  const clearApiLog = () => {
    dispatch({
      type: eGithubActionTypes.SET_API_LOG,
      payload: ''
    });
  };
  //Return Provider
  return (
    <GithubContext.Provider
      value={{
        ...state,
        clearApiLog: clearApiLog,
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
