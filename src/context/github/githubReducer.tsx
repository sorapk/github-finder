import { eActionTypes } from '../types';
import { GithubContextState } from './githubContext';
import { UserType } from '../../components/users/Users';

export interface GithubReducerAction {
  type: eActionTypes;
  payload?: (UserType | null) | UserType[] | string[];
}

const githubReducer = (
  state: GithubContextState,
  action: GithubReducerAction
): GithubContextState => {
  let nextState: GithubContextState = state;
  const { type, payload } = action;

  switch (type) {
    case eActionTypes.SET_LOADING:
      nextState = { ...state, loading: true };
      break;
    case eActionTypes.CLEAR_USERS:
      nextState = { ...state, userList: [] };
      break;
    case eActionTypes.GET_USER:
      console.assert(payload !== undefined);
      nextState = {
        ...state,
        user: payload as UserType | null
      };
      break;
    case eActionTypes.SEARCH_USER:
      console.assert(payload !== undefined);

      nextState = {
        ...state,
        userList: payload as UserType[],
        loading: false
      };
      break;
    case eActionTypes.GET_REPOS:
      console.assert(payload !== undefined);

      nextState = {
        ...state,
        repos: payload as string[],
        loading: false
      };
      break;
  }

  return nextState;
};
export default githubReducer;
