import { eGithubActionTypes } from '../types';
import { GithubContextState } from './githubContext';
import { UserType } from '../../components/users/Users';

export interface GithubReducerAction {
  type: eGithubActionTypes;
  payload?: UserType | null | UserType[] | string[] | string;
}

const githubReducer = (
  state: GithubContextState,
  action: GithubReducerAction
): GithubContextState => {
  let nextState: GithubContextState = state;
  const { type, payload } = action;

  switch (type) {
    case eGithubActionTypes.SET_LOADING:
      nextState = { ...state, loading: true };
      break;
    case eGithubActionTypes.CLEAR_USERS:
      nextState = { ...state, userList: [] };
      break;
    case eGithubActionTypes.GET_USER:
      console.assert(payload !== undefined);
      nextState = {
        ...state,
        user: payload as UserType | null
      };
      break;
    case eGithubActionTypes.SEARCH_USER:
      console.assert(payload !== undefined);

      nextState = {
        ...state,
        userList: payload as UserType[],
        loading: false
      };
      break;
    case eGithubActionTypes.GET_REPOS:
      console.assert(payload !== undefined);

      nextState = {
        ...state,
        repos: payload as string[],
        loading: false
      };
      break;
    case eGithubActionTypes.SET_API_LOG:
      nextState = {
        ...state,
        apiLog: payload as string
      };
      break;
  }

  return nextState;
};
export default githubReducer;
