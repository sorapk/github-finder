import React, { Fragment, useEffect, useContext } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { Spinner } from '../layout/Spinner';
import Repos from '../repos/Repos';
import GithubContext from '../../context/github/githubContext';

const User = (props: RouteComponentProps<{ login: string }>) => {
  const githubContext = useContext(GithubContext);

  useEffect(
    //run when Component did mount
    () => {
      console.log('effecting');
      githubContext.getUser(props.match.params.login);
      githubContext.getUserRepos(props.match.params.login);

      return () => {
        // cleanup
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      /*dependencies*/
    ]
  );

  const { user, loading, repos } = githubContext;

  if (user !== null) {
    const {
      login,
      avatar_url,
      location,
      blog,
      html_url,
      followers,
      following,
      public_repos,
      public_gists,
      bio,
      hireable,
      company,
      name
    } = user;
    if (loading) {
      return <Spinner />;
    }
    return (
      <Fragment>
        <Link to='/' className='btn btn-light'>
          Back To Search
        </Link>
        Hireable:{' '}
        {hireable ? (
          <i className='fas fa-check text-success' />
        ) : (
          <i className='fas fa-times-circle text-danger' />
        )}
        <div className='card grid-2'>
          <div className='all-center'>
            <img
              src={avatar_url}
              className='round-img'
              alt=''
              style={{ width: '150px' }}
            />
            <h1>{name}</h1>
            <p>{location && <Fragment>Location: {location} </Fragment>}</p>
          </div>
          <div>
            {bio && (
              <Fragment>
                <h3>Bio</h3>
                <p>{bio}</p>
              </Fragment>
            )}
            <a href={html_url} className='btn btn-dark my1'>
              Visit Github Profile
            </a>
            <ul>
              <li>
                {login && (
                  <Fragment>
                    <strong>Username: </strong> {login}
                  </Fragment>
                )}
              </li>
              <li>
                {company && (
                  <Fragment>
                    <strong>Company: </strong> {company}
                  </Fragment>
                )}
              </li>
              <li>
                {blog && (
                  <Fragment>
                    <strong>Blog: </strong> {blog}
                  </Fragment>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div className='card text-center'>
          <div className='badge badge-primary'>Followers: {followers}</div>
          <div className='badge badge-success'>Following: {following}</div>
          <div className='badge badge-light'>Public Repos: {public_repos}</div>
          <div className='badge badge-dark'>Gists: {[public_gists]}</div>
        </div>
        <Repos repos={repos} />
      </Fragment>
    );
  }
  return null;
};

export default User;
