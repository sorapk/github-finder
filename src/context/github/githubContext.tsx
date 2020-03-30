import { createContext } from 'react';
import { UserType } from '../../components/users/Users';

export interface GithubContextState {
  userList: UserType[];
  user: UserType | null;
  repos: string[];
  loading: boolean;
  apiLog: string;
}
export interface GithubContextMethod {
  clearApiLog: () => void;
  searchUsers: (login: string) => void;
  clearUsers: () => void;
  getUser: (login: string) => Promise<void>;
  getUserRepos: (login: string) => Promise<void>;
}

export const InitGithubContextState: Readonly<GithubContextState> = {
  userList: [],
  user: null,
  repos: [],
  loading: false,
  apiLog: ''
};
export const InitGithubContextMethod: Readonly<GithubContextMethod> = {
  clearApiLog: () => {
    console.error('Context Not Set');
  },
  searchUsers: (login: string) => {
    console.error('Context Not Set');
  },
  clearUsers: () => {},
  getUser: (login: string) => {
    console.error('Context Not Set');
    return Promise.resolve();
  },
  getUserRepos: (login: string) => {
    console.error('Context Not Set');
    return Promise.resolve();
  }
};

const GithubContext = createContext<GithubContextState & GithubContextMethod>({
  ...InitGithubContextState,
  ...InitGithubContextMethod
});

export default GithubContext;
