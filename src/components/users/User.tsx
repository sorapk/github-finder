import React, { Component, Fragment } from 'react';
import { UserType } from './Users';
import { RouteComponentProps, Link } from 'react-router-dom';
import { Spinner } from '../layout/Spinner';

interface UserProp extends RouteComponentProps<{ login: string }> {
  getUser: (login: string) => void;
  user: UserType | null;
  loading: boolean;
}

class User extends Component<UserProp, any> {
  componentDidMount() {
    this.props.getUser(this.props.match.params.login);
  }
  render() {
    const { user, loading } = this.props;

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
        </Fragment>
      );
    }
    return null;
  }
}

export default User;
