import React from 'react';

interface RepoItemProp {
  repo: any;
}
const RepoItem = ({ repo }: RepoItemProp) => {
  return (
    <div className='card'>
      <h3>
        <a href={repo.html_url}>{repo.name}</a>
      </h3>
    </div>
  );
};

export default RepoItem;
