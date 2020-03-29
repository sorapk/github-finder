import React, { Fragment } from 'react';
import RepoItem from './RepoItem';

interface ReposProp {
  repos: any[];
}

const Repos = ({ repos }: ReposProp) => {
  return (
    <Fragment>
      {repos.map((repo: any) => (
        <RepoItem repo={repo} key={repo.id} />
      ))}
    </Fragment>
  );
};

export default Repos;
